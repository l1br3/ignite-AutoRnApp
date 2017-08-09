Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _ramda=require('ramda');var _ramda2=_interopRequireDefault(_ramda);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

function capitalize(string){
return string.charAt(0).toUpperCase()+string.slice(1);
}
function camelToSnake(string){
return string.replace(/\.?([A-Z]+)/g,function(x,y){return'_'+y.toLowerCase();}).replace(/^_/,'');
}
function objectToArray(obj,fn){
var arr=[];
_lodash2.default.each(obj,function(prop,propName){
var result=fn(prop,propName);
arr.push(result);
});
return arr;
}var

ConfigBuilder=function(){

function ConfigBuilder(config){(0,_classCallCheck3.default)(this,ConfigBuilder);
this.preConfig=(0,_extends3.default)({},config);

this.config=JSON.parse((0,_stringify2.default)(config));
this.subs=this.config.subs;

this.buildConfig();
}(0,_createClass3.default)(ConfigBuilder,[{key:'buildConfig',value:function buildConfig()

{
var confBuilder=this;





var process=function process(hoc,hocName,level,pathModifier){return _regenerator2.default.mark(function _callee(){var debug;return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
debug=false;_context.next=3;return(
confBuilder.setRCompAttributes(hoc,hocName,level,pathModifier));case 3:_context.next=5;return(
confBuilder.createFileJobs(hoc));case 5:_context.next=7;return(
confBuilder.createReduxStates(hoc));case 7:_context.next=9;return(
confBuilder.createReduxActions(hoc));case 9:_context.next=11;return(
confBuilder.createTemplateImports(hoc));case 11:case'end':return _context.stop();}}},_callee,this);})();};





var generators={};
for(var tabName in this.subs){
var topHoc=this.subs[tabName];
generators[tabName]=process(topHoc,tabName,0,capitalize(tabName));

for(var modalName in topHoc.subs){
var modal=topHoc.subs[modalName];
generators[modalName]=process(modal,modalName,1,capitalize(tabName)+'/'+capitalize(modalName));

for(var hocName in modal.subs){
var hoc=modal.subs[hocName];
generators[hocName]=process(hoc,hocName,2,capitalize(tabName)+'/'+capitalize(modalName));
}
}
}


var running=true;
while(running){
_lodash2.default.each(generators,function(generator){
var next=generator.next();
running=!next.done;
});
}
}},{key:'setRCompAttributes',value:function setRCompAttributes(


hoc,hocName,level,pathModifier){
hoc.level=level;
hoc.name=hocName;
hoc.Name=capitalize(hocName);
hoc.NAME=hocName.toUpperCase(),
hoc.screenRootDir='App/Screens/'+pathModifier;
hoc.reduxRootDir='App/Redux/'+pathModifier;
hoc.sagaRootDir='App/Sagas/'+pathModifier;
hoc.apiRootDir='App/Services/API';
hoc.ScreenName=hoc.Name+'Screen';
hoc.componentRootDir=hoc.screenRootDir+'/_Components';
hoc.stylesRootDir=hoc.screenRootDir+'/_Styles';
hoc.crud=hoc.model?true:false;
hoc.response=hoc.response||[];
hoc.subsNames=objectToArray(hoc.subs,function(sub,subName){return{
name:subName,
Name:capitalize(subName),
NAME:camelToSnake(subName).toUpperCase()};});

}},{key:'createFileJobs',value:function createFileJobs(

hoc){
var hocType=hoc.type||'';
hoc.templates=[{
template:'container.ejs.jsx',
target:hoc.screenRootDir+'/'+hoc.Name+'.js'},
{
template:'container_style.sty.ejs.js',
target:hoc.stylesRootDir+'/sty.'+hoc.Name+'.js'},
{
template:'component.cmp.ejs.jsx',
target:hoc.componentRootDir+'/cmp.'+hoc.Name+'.js'},
{
template:'component_style.cmp.sty.ejs.jsx',
target:hoc.componentRootDir+'/_Styles/sty.cmp.'+hoc.Name+'.js'},
{
template:'redux.rdx.ejs.jsx',
target:hoc.reduxRootDir+'/rdx.'+hoc.Name+'.js'},
{
template:'saga.sga.ejs.jsx',
target:hoc.sagaRootDir+'/sga.'+hoc.Name+'.js'},
{
template:'api.ejs.jsx',
target:hoc.apiRootDir+'/api.'+hoc.Name+'.js'}].
map(function(job){return{job:job};});

}},{key:'createReduxStates',value:function createReduxStates(

hoc){



var states=[];


if('model'in hoc){
var props=_ramda2.default.unnest(objectToArray(hoc.model,function(prop,propName){return propName;}));
states=states.concat(props);
states=states.concat(['doingGet'+hoc.Name,'doneGet'+hoc.Name]);
states=states.concat(['doingCreate'+hoc.Name,'doneCreate'+hoc.Name]);
states=states.concat(['doingDestroy'+hoc.Name,'doneDestroy'+hoc.Name]);
states=states.concat(_ramda2.default.unnest(props.map(function(prop){return['doingUpdate'+hoc.Name+capitalize(prop),'doneUpdate'+hoc.Name+capitalize(prop)];})));


}else if('subs'in hoc){
states=objectToArray(hoc.subs,function(subHoc,subHocName){return['doing'+capitalize(subHocName),'done'+capitalize(subHocName)];});


}else{
states=['doing'+hoc.Name,'done'+hoc.Name].concat(hoc.props);
}

hoc.states=states;


if(hoc.level===0){
var subNames=objectToArray(hoc.subs,function(sub,subName){return subName;});
hoc.states=hoc.states.concat(subNames.map(function(subName){return'show'+capitalize(subName)+'Modal';}));
}

hoc.initialState=(0,_stringify2.default)(_ramda2.default.mergeAll(hoc.states.map(function(state){return(0,_defineProperty3.default)({},state,false);})),null,'\t');
}},{key:'createReduxActions',value:function createReduxActions(

hoc,level){



var actions=[];


if('model'in hoc){
var props=_ramda2.default.unnest(objectToArray(hoc.model,function(prop,propName){return propName;}));
actions.push({
name:'get'+hoc.Name,
args:['id'],
res:props});

actions.push({
name:'create'+hoc.Name,
args:props,
res:[]});

actions.push({
name:'delete'+hoc.Name,
args:['id'],
res:[]});

props.map(function(prop){
actions.push({
name:'update'+hoc.Name+capitalize(prop),
args:[prop],
res:[prop]});

});


}else{
actions=[{
name:hoc.name,
args:hoc.props||[],
res:hoc.response||[]}];

}


hoc.actions=actions.map(function(action){return(0,_extends3.default)({},
action,{
Name:capitalize(action.name),
NAME:camelToSnake(action.name).toUpperCase()});});

}},{key:'createTemplateImports',value:function createTemplateImports(


hoc){
hoc.subHocsList=objectToArray(hoc.subs,function(subHoc){return subHoc.Name;});

hoc.templates.map(function(template){
var jobType=template.job.template.match(/(^\w*)\./)[1];
template.props={};


switch(jobType){
case'container':
template.props.imports=hoc.subHocsList.map(function(subHoc){return('import '+subHoc+' from \'./'+subHoc+'\'').trim();}).
concat(['import styles from \'./_Styles/sty.'+hoc.Name+'\'']).
concat(['import '+hoc.Name+'Component from \'./_Components/cmp.'+hoc.Name+'\'']).


concat(function(){
if(hoc.level===0){
return['import * AS '+hoc.name+'Actions from \''+hoc.reduxRootDir+'/rdx.'+hoc.Name+'\''];
}else if(hoc.level===2){
return['import { '+hoc.name+'Request } from \''+hoc.reduxRootDir+'/rdx.'+hoc.Name+'\''];
}else{
return[];
}
}());
break;

case'component':
template.props.imports=['import styles from \'./_Styles/sty.cmp.'+hoc.Name+'\''];
break;}

});
}}]);return ConfigBuilder;}();exports.default=ConfigBuilder;