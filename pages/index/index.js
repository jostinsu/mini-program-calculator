//index.js
//获取应用实例
var cal = require("../../utils/util.js");

Page({
  data: {
    express: "",
    lastChar: ""
  },
  
  //事件处理函数
  operatorTap: function(event) {
    var inputChar = event.currentTarget.dataset.value;
    if(this.data.express){
      this.getLastChar();
      if(!isNaN(this.data.lastChar)){
        if(inputChar!="="){
          this.setData({ express : this.data.express + inputChar });
        }else{
          this.setData({ express : cal.calculate(this.data.express).toString() });
        }
      }
    }else{
      if(inputChar=="-"||inputChar=="+"){
        this.setData({ express : inputChar });
      }
    }
  },
  
  numberTap: function(event) {
    var inputChar = event.currentTarget.dataset.value;
    this.setData( {express : this.data.express + inputChar} );
  },

  operateTap: function(event) {
    var operateValue = event.currentTarget.dataset.value;
    if(operateValue == "delete"){
      this.setData({ express : "" });
    }else{
      console.log(this.data.express);
      if(this.data.express.length){
        this.setData({ express : this.data.express.slice(0,this.data.express.length-1) });
      }
    }
  },

  getLastChar: function(){
    if(this.data.express){
      this.data.lastChar = this.data.express.slice(-1,this.data.express.length);
    }else{
      this.data.lastChar = "";
    }
  }

})


