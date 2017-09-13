Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _regenerator=require('babel-runtime/regenerator');var _regenerator2=_interopRequireDefault(_regenerator);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _ramda=require('ramda');var _ramda2=_interopRequireDefault(_ramda);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var regeneratorRuntime=require('regenerator-runtime');function capitalize(string){return string.charAt(0).toUpperCase()+string.slice(1);}function camelToSnake(string){return string.replace(/\.?([A-Z]+)/g,function(x,y){return'_'+y.toLowerCase();}).replace(/^_/,'');}function objectToArray(obj,fn){var arr=[];_lodash2.default.each(obj,function(prop,propName){var result=fn(prop,propName);arr.push(result);});return arr;}var ConfigBuilder=function(){function ConfigBuilder(config){(0,_classCallCheck3.default)(this,ConfigBuilder);this.preConfig=JSON.parse((0,_stringify2.default)(config));this.config=config;this.buildConfig();}(0,_createClass3.default)(ConfigBuilder,[{key:'buildConfig',value:function buildConfig(){var confBuilder=this;var process=function process(hoc,hocName,level,pathModifier){return _regenerator2.default.mark(function _callee(){var debug;return _regenerator2.default.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:debug=false;_context.next=3;return confBuilder.setRCompAttributes(hoc,hocName,level,pathModifier);case 3:_context.next=5;return confBuilder.createFileJobs(hoc);case 5:_context.next=7;return confBuilder.createReduxStates(hoc);case 7:_context.next=9;return confBuilder.createReduxActions(hoc);case 9:_context.next=11;return confBuilder.createTemplateProps(hoc);case 11:case'end':return _context.stop();}}},_callee,this);})();};var generators={};for(var tabName in this.config.subs){var topHoc=this.config.subs[tabName];generators[tabName]=process(topHoc,tabName,0,capitalize(tabName));for(var modalName in topHoc.subs){var modal=topHoc.subs[modalName];generators[modalName]=process(modal,modalName,1,capitalize(tabName)+'/'+capitalize(modalName));for(var hocName in modal.subs){var hoc=modal.subs[hocName];generators[hocName]=process(hoc,hocName,2,capitalize(tabName)+'/'+capitalize(modalName));}}}var running=true;while(running){_lodash2.default.each(generators,function(generator){var next=generator.next();running=!next.done;});}}},{key:'setRCompAttributes',value:function setRCompAttributes(hoc,hocName,level,pathModifier){hoc.level=level;hoc.name=hocName;hoc.Name=capitalize(hocName);hoc.NAME=hocName.toUpperCase(),hoc.screenRootDir='Screens/'+pathModifier;hoc.reduxRootDir='Redux/'+pathModifier;hoc.sagaRootDir='Sagas/'+pathModifier;hoc.apiRootDir='Services/API';hoc.ScreenName=hoc.Name+'Screen';hoc.componentRootDir=hoc.screenRootDir+(hoc.level!==0?'/_Components':'');hoc.stylesRootDir=hoc.screenRootDir+(hoc.level!==0?'/_Styles':'');hoc.crud=hoc.model?true:false;hoc.response=hoc.response||[];hoc.subsNames=objectToArray(hoc.subs,function(sub,subName){return{name:subName,Name:capitalize(subName),NAME:camelToSnake(subName).toUpperCase()};});}},{key:'createFileJobs',value:function createFileJobs(hoc){var hocType=void 0;switch(hoc.level){case 0:hocType='tab';break;case 1:hocType='modal';break;case 2:hocType='submodal';break;}hoc.templates=[{template:'hoc.'+hocType+'.ejs.jsx',target:'App/'+hoc.screenRootDir+'/'+hoc.Name+'.js'},{template:'sty.hoc.ejs.js',target:'App/'+hoc.stylesRootDir+'/sty.'+hoc.Name+'.js'},{template:'cmp.'+hocType+'.ejs.jsx',target:'App/'+hoc.componentRootDir+'/cmp.'+hoc.Name+'.js'},{template:'sty.cmp.ejs.js',target:'App/'+hoc.componentRootDir+'/'+(hoc.level!==0?'_Styles':'')+'/sty.cmp.'+hoc.Name+'.js'}].concat(function(){if(hoc.level!==1||'actions'in hoc||'model'in hoc){return[{template:'rdx.ejs.js',target:'App/'+hoc.reduxRootDir+'/rdx.'+hoc.Name+'.js'},{template:'sga.ejs.js',target:'App/'+hoc.sagaRootDir+'/sga.'+hoc.Name+'.js'},{template:'api.ejs.js',target:'App/'+hoc.apiRootDir+'/api.'+hoc.Name+'.js'}];}else{return[];}}()).map(function(job){return{job:job,props:{}};});}},{key:'createReduxStates',value:function createReduxStates(hoc){var states=[];if('model'in hoc){var props=_ramda2.default.unnest(objectToArray(hoc.model,function(prop,propName){return propName;}));states=states.concat(props);states=states.concat(['doingGet'+hoc.Name,'doneGet'+hoc.Name]);states=states.concat(['doingCreate'+hoc.Name,'doneCreate'+hoc.Name]);states=states.concat(['doingDestroy'+hoc.Name,'doneDestroy'+hoc.Name]);states=states.concat(_ramda2.default.unnest(props.map(function(prop){return['doingUpdate'+hoc.Name+capitalize(prop),'doneUpdate'+hoc.Name+capitalize(prop)];})));}else if('subs'in hoc&&hoc.level===1){states=_ramda2.default.unnest(objectToArray(hoc.subs,function(subHoc,subHocName){return['doing'+capitalize(subHocName),'done'+capitalize(subHocName),'error'+capitalize(subHocName)];}));}else if(hoc.level===2){states=['doing'+hoc.Name,'done'+hoc.Name,'error'+hoc.Name];}if('actions'in hoc){states=states.concat(_ramda2.default.unnest(objectToArray(hoc.actions,function(action,actionName){return['doing'+capitalize(actionName),'done'+capitalize(actionName),'error'+capitalize(actionName)];})));}if('response'in hoc){states=states.concat(hoc.response);}hoc.states=states;hoc.initialState=(0,_stringify2.default)(_ramda2.default.mergeAll(hoc.states.map(function(state){return(0,_defineProperty3.default)({},state,state.match(/doing|done/)?false:null);})),null,'\t');}},{key:'createReduxActions',value:function createReduxActions(hoc,level){var actions=[];if('model'in hoc){var props=_ramda2.default.unnest(objectToArray(hoc.model,function(prop,propName){return propName;}));actions.push({name:'get'+hoc.Name,args:['id'],res:props});actions.push({name:'create'+hoc.Name,args:props,res:[]});actions.push({name:'delete'+hoc.Name,args:['id'],res:[]});props.map(function(prop){actions.push({name:'update'+hoc.Name+capitalize(prop),args:[prop],res:[prop]});});}else if(hoc.level===2){actions=[{name:hoc.name,args:hoc.props||[],res:hoc.response||[],type:hoc.type||'get',isForm:hoc.isForm}];}if('actions'in hoc){var singleActions=objectToArray(hoc.actions,function(action,actionName){return(0,_extends3.default)({},action,{name:actionName,args:action.props||[],res:action.response||[]});});actions=[].concat((0,_toConsumableArray3.default)(actions),(0,_toConsumableArray3.default)(singleActions.map(function(action){return(0,_extends3.default)({},action,{Name:capitalize(action.name),NAME:camelToSnake(action.name).toUpperCase()});})));}hoc.actions=actions.map(function(action){return(0,_extends3.default)({},action,{Name:capitalize(action.name),NAME:camelToSnake(action.name).toUpperCase()});});}},{key:'createTemplateProps',value:function createTemplateProps(hoc){for(var _iterator=hoc.templates,_isArray=Array.isArray(_iterator),_i=0,_iterator=_isArray?_iterator:(0,_getIterator3.default)(_iterator);;){var _ref2;if(_isArray){if(_i>=_iterator.length)break;_ref2=_iterator[_i++];}else{_i=_iterator.next();if(_i.done)break;_ref2=_i.value;}var template=_ref2;var jobType=template.job.template.match(/(^\w*)\./)[1];var isStackComponentStyle=template.job.template.match('sty')&&hoc.level!==0;template.props=isStackComponentStyle?(0,_extends3.default)({},template.props,{isStackComponentStyle:true}):template.props;this.createTemplateMiscProps(hoc,template.props,jobType);this.createTemplateImports(hoc,template.props,jobType);}}},{key:'createTemplateImports',value:function createTemplateImports(hoc,props,jobType){hoc.subHocsList=objectToArray(hoc.subs,function(subHoc){return subHoc.Name;});if(jobType==='hoc'){props.imports=hoc.subHocsList.map(function(subHoc){return hoc.level===0?'import '+subHoc+' from \'./'+subHoc+'/'+subHoc+'\'':('import '+subHoc+' from \'./'+subHoc+'\'').trim();}).concat(['import styles from \'./'+(hoc.level!==0?'_Styles/':'')+'sty.'+hoc.Name+'\'']).concat(['import '+hoc.Name+'Component from \'./'+(hoc.level!==0?'_Components/':'')+'cmp.'+hoc.Name+'\'']).concat(function(){if(hoc.level!=1||hoc.actions.length>0){return['import '+hoc.name+'Actions from \''+hoc.reduxRootDir+'/rdx.'+hoc.Name+'\''];}else{return[];}}());}else if(jobType==='cmp'){props.imports=['import styles from \'./'+(hoc.level!==0?'_Styles/':'')+'sty.cmp.'+hoc.Name+'\''];}}},{key:'createTemplateMiscProps',value:function createTemplateMiscProps(hoc,props){props.name=hoc.name,props.Name=hoc.Name,props.NAME=hoc.name.toUpperCase(),props.initialState=hoc.initialState;props.actions=hoc.actions;props.ComponentName=hoc.Name;props.states=hoc.states;props.subsNames=hoc.subsNames;props.devUrl=this.config.rootUrl.dev;props.prodUrl=this.config.rootUrl.prod;props.isCrud='model'in hoc;props.isForm=hoc.setForm;props.navs=hoc.navs;props.includeInStack=hoc.includeInStack;props.reduxRootDir=hoc.reduxRootDir;props.dirname=__dirname;}}]);return ConfigBuilder;}();exports.default=ConfigBuilder;