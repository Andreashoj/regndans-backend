const { Model } = require('objection');
const {format} = require("date-fns");

class BaseModel extends Model{

  constructor(){
    super();
  }

  $beforeInsert(){
    const now = new Date();
    now = format(now, "yyyy.MM.dd");
    this.createdAt = now;
    this.updateAt = now;
  }

  $afterUpdate(){
    const now = new Date();
    now = format(now,"yyyy.MM.dd");
    this.updateAt = now;
  }

}

module.exports = BaseModel;