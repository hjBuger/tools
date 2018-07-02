function ExcelConvert(source, result) {
    this.source = document.querySelector(source);//源对象
    this.result = document.querySelector(result);//结果对象
    this.type = ["json","table"];//可选类型
}

//转换
ExcelConvert.prototype.convert = function (type) {
    type = type || "";
    this.rows = this.toStyle( this.source.value.split("\n") );//通过换行符 '\n' 拆分行
    this.cols = [];
    for(var i = 0;i < this.rows.length ;i++){
        this.cols.push(this.rows[i].split(/\t/));//通过制表符 '\t' 拆分列
    }
    this.title = this.cols[0];//标题，json的属性名
    this.jsonList = this.getJsonList(this.cols);//json列表

    //结果对象的值
    if(type === "json" || type === ""){
        this.result.value = this.jsonList;
    }
    if(type === "table"){
        //this.result.value = this.jsonList;
    }
};

//清空值
ExcelConvert.prototype.clearTxt = function () {
    this.source.value = "";
    this.result.value = "";
};

//去掉前后空格
ExcelConvert.prototype.trim = function(str){
    return str.replace(/^(\s|\u00A0)+/,'').replace(/(\s|\u00A0)+$/,'');
};

//去掉空行
ExcelConvert.prototype.toStyle = function (arr) {
    var newArr = [];
    for(var i=0 ; i<arr.length;i++){
        var val = this.trim(arr[i]);
        if(val !== ""){
            newArr.push(val);
        }
    }

    return newArr;
};

//生成jsonList
ExcelConvert.prototype.getJsonList = function (arr) {
    var jsonList = "[\n";
    for(var i=1;i<arr.length;i++){
        var json = {};
        for(var j=0;j<arr[i].length;j++){
            json[this.title[j]] = arr[i][j];
        }
        if(i<arr.length-1){
            jsonList += JSON.stringify(json) + ",\n";
        }else{
            jsonList += JSON.stringify(json);
        }
    }
    jsonList += "\n]";

    return jsonList;
};
