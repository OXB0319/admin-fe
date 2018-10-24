import Vue from "vue";
import toast from './my-toast.vue';
let MyToast = Vue.extend(toast);

let baseData = {toastImg:"",loading:false,toastText:"",toastVisible: false,toastbg:false,clickHide:false, duration: 3000};
let clearTime = 0;
let instance;
let initInstance = function() {
  instance = new MyToast({
    el: document.createElement('div')
  });
  window.$app.$el.appendChild(instance.$el);
  instance.$on("hide",hide);
  return instance;
}

let hide = function(){
  if (!instance) {
    initInstance();
  }
  clearTimeout(clearTime);
  for (let key in baseData) {
    instance[key] = baseData[key];
  }
}

let pop = function(obj) {
  if (!instance) {
    initInstance();
  }
  obj = Object.assign({},baseData,obj);
  for (let key in obj) {
    instance[key] = obj[key];
  }
  clearTimeout(clearTime);
  if (obj.duration) {
    clearTime = setTimeout(function () {
      hide();
    }, obj.duration);
  }
}

let PopToast = function() {

};
PopToast.alert = function(obj) {
  pop(obj);
}

PopToast.hide = function (options) {
  const shouldKeepPopToastBefore = options && options.keepBefore;
  const hasInstanceShouldBeKept = instance && ['warning', 'failure'].includes(instance.toastImg);
  const shouldHide = !(shouldKeepPopToastBefore && hasInstanceShouldBeKept);

  shouldHide && hide();
};

export default PopToast;
export {
  PopToast
};
