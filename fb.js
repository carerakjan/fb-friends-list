// window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '1546376588908369',
//       xfbml      : true,
//       version    : 'v2.1'
//     });
//   };

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "//connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));



  /************************/
  window.__FB__ = {};
!function(FB){
  var API = 'http://carerakjan.github.io/fb-friends-list/';  
  
  var OAuth = function(){
    var scope = {};
    var OA = function(o) {
      var authParams = {
        url:o.url||'',
        params:o.params||{}
      };
      authParams.params.redirect_uri = API;
      authParams.params.response_type = 'code';
      authParams.params.display = 'popup';
      
      var createQueryString = function(){
        var u = authParams.url;
        for(var i in  authParams.params){
          u += (i+"="+authParams.params[i]+"&")
        }
        return u.replace(/&$/,'');
      };
      
      var win, winParams = {
        src:createQueryString()
        ,name:o.name||''
        ,options:"width=656,height=377,resizable=no,scrollbars=no,status=no,top="+(screen.height-337)/2+",left="+(screen.width-656)/2
      };
          
      this.openDialog = function(){
        win = window.open(
          winParams.src,
          winParams.name+"_"+(new Date()).valueOf(),
          winParams.options
        );
      }
      scope[o.type||'oauth'+new Date().valueOf()] = this;
    };
    OA.prototype.factoryMethod = function(options) {
      var tp = typeof options;
      if( /undefined/.test(tp) ||
        (/object/.test(tp) && options === null) ||
        !/object/.test(tp) ) return null;
      
      if('type' in options && options.type in scope)
        return scope[options.type];
      
      return new OAuth(options);
    };
    return OA;
  }();
  
  var SOC = {
    fb: {
      type:'fb',
      url:'https://graph.facebook.com/oauth/authorize?',
      name:'fbOAuth',
      params:{
        client_id:'1546376588908369',
        scope:['offline_access']
      } 
    }
  };
  
  FB.oauth = function(s) {
    return OAuth.prototype.factoryMethod(function(s){
      if(s in SOC) return SOC[s];
    }(s));  
  };
  
  FB.goback = function() {
    window.location = "https://online.deltabank.com.ua/";
  };
  
}(window.__FB__);

$(document).ready(function(){
  var social = window.__FB__;
  function click(soc){
    return function(){
      var s = social.oauth(soc);
      if(s === null) return;
      s.openDialog();
    };  
  };
    
 
  $('#login_fb').click(click('fb'));

});



