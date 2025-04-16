class Entities {
    constructor(name, schema) {
        this.name = name;
        this.schema = schema;
        this.data = require('./../data/' + name + '.json');
        this.currentId = this.data.length > 0 ? Math.max(...this.data.map(element => element.id)) : 0;
    }

    save() {
        fs.writeFileSync('./data/' + this.name + '.json', JSON.stringify(this.data));
    }

    async findAll(options) {
        if(!options.where){
            return this.data;
        }
        return this.data.filter(element => this.checkWhereClause(element, options));
    }

    async findOne(options) {
        if(!options.where){
            return this.data[0];
        }
        return this.data.find(element => this.checkWhereClause(element, options));
    }

    async create(element) {
        if(!this.checkConstraint(element)){
            return false;
        }
        let newElement = {
            ...element,
            id: ++this.currentId
        }
        this.data.push(newElement);
        this.save();
        return newElement;
    }

    async updateOne(element, options) {
        const findElement = this.findOne(options);
        if(!findElement){
            return false;
        }
        if(!this.checkConstraint(element, options)){
            return false;
        }
        for(let [property, value] of Object.entries(element)){
            findElement[property] = value;
        }
        this.save();
        return element;
    }

    async destroy(options) {
        let count = this.data.length;
        this.data = this.data.filter(element => !this.checkWhereClause(element, options));
        this.save();
        return count - this.data.length;
    }

    checkWhereClause(element, options){
        for(let [field, value] of Object.entries(options.where)){
            if(!element[field]){
                return false;
            }
            if(typeof element[field] === 'number'){
                value = parseFloat(value);
            }
            if(element[field] !== value){
                return false;
            }
        }
        return true;
    }

    checkConstraint(element){
        for(let [field, value] of Object.entries(element)){
            if(!this.checkFormat(value, this.schema[field])){
                return false;
            }
            if(this.schema[field].unique){
                if(!this.checkUnique(field, element[field])){
                    return false;
                }
            }
        }
        return true;
    }

    checkFormat(field, schema){
        if(!field){
            throw new Error("Le champ " + field + " est obligatoire");
        }
        if(!schema){
            throw new Error("Le champ " + field + " n'est pas autorisé");
        }
        if(typeof field !== schema.type){
            throw new Error("Le champ " + field + " doit être de type : " + schema.type);
        }
        return true;
    }

    checkUnique(field,value){
        let obj = {};
        obj[field] = value; 
        let element = this.findOne({
            where: obj
        });
        if(element){
            throw new Error("La valeur du champ " + field + " doit être unique");
        }
        return true;
    }
}

module.exports = Entities;