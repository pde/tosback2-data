var googol={},fyre = fyre || {};(function(goog, fyre) {var COMPILED = !0, goog = goog || {};
goog.global = this;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function $goog$provide$($name$$) {
  if(!COMPILED) {
    if(goog.isProvided_($name$$)) {
      throw Error('Namespace "' + $name$$ + '" already declared.');
    }
    delete goog.implicitNamespaces_[$name$$];
    for(var $namespace$$ = $name$$;($namespace$$ = $namespace$$.substring(0, $namespace$$.lastIndexOf("."))) && !goog.getObjectByName($namespace$$);) {
      goog.implicitNamespaces_[$namespace$$] = !0
    }
  }
  goog.exportPath_($name$$)
};
goog.setTestOnly = function $goog$setTestOnly$($opt_message$$) {
  if(COMPILED && !goog.DEBUG) {
    throw $opt_message$$ = $opt_message$$ || "", Error("Importing test-only code into non-debug environment" + $opt_message$$ ? ": " + $opt_message$$ : ".");
  }
};
COMPILED || (goog.isProvided_ = function $goog$isProvided_$($name$$) {
  return!goog.implicitNamespaces_[$name$$] && !!goog.getObjectByName($name$$)
}, goog.implicitNamespaces_ = {});
goog.exportPath_ = function $goog$exportPath_$($name$$56_parts$$, $opt_object$$, $cur_opt_objectToExportTo$$) {
  $name$$56_parts$$ = $name$$56_parts$$.split(".");
  $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$ || goog.global;
  !($name$$56_parts$$[0] in $cur_opt_objectToExportTo$$) && $cur_opt_objectToExportTo$$.execScript && $cur_opt_objectToExportTo$$.execScript("var " + $name$$56_parts$$[0]);
  for(var $part$$;$name$$56_parts$$.length && ($part$$ = $name$$56_parts$$.shift());) {
    !$name$$56_parts$$.length && goog.isDef($opt_object$$) ? $cur_opt_objectToExportTo$$[$part$$] = $opt_object$$ : $cur_opt_objectToExportTo$$ = $cur_opt_objectToExportTo$$[$part$$] ? $cur_opt_objectToExportTo$$[$part$$] : $cur_opt_objectToExportTo$$[$part$$] = {}
  }
};
goog.getObjectByName = function $goog$getObjectByName$($name$$, $opt_obj$$) {
  for(var $parts$$ = $name$$.split("."), $cur$$ = $opt_obj$$ || goog.global, $part$$;$part$$ = $parts$$.shift();) {
    if(goog.isDefAndNotNull($cur$$[$part$$])) {
      $cur$$ = $cur$$[$part$$]
    }else {
      return null
    }
  }
  return $cur$$
};
goog.globalize = function $goog$globalize$($obj$$, $opt_global$$) {
  var $global$$ = $opt_global$$ || goog.global, $x$$;
  for($x$$ in $obj$$) {
    $global$$[$x$$] = $obj$$[$x$$]
  }
};
goog.addDependency = function $goog$addDependency$($path$$, $provides_require$$, $requires$$) {
  if(!COMPILED) {
    for(var $j_provide$$, $path$$ = $path$$.replace(/\\/g, "/"), $deps$$ = goog.dependencies_, $i$$ = 0;$j_provide$$ = $provides_require$$[$i$$];$i$$++) {
      $deps$$.nameToPath[$j_provide$$] = $path$$;
      $path$$ in $deps$$.pathToNames || ($deps$$.pathToNames[$path$$] = {});
      $deps$$.pathToNames[$path$$][$j_provide$$] = true
    }
    for($j_provide$$ = 0;$provides_require$$ = $requires$$[$j_provide$$];$j_provide$$++) {
      $path$$ in $deps$$.requires || ($deps$$.requires[$path$$] = {});
      $deps$$.requires[$path$$][$provides_require$$] = true
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function $goog$require$($errorMessage_name$$) {
  if(!COMPILED && !goog.isProvided_($errorMessage_name$$)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var $path$$ = goog.getPathFromDeps_($errorMessage_name$$);
      if($path$$) {
        goog.included_[$path$$] = true;
        goog.writeScripts_();
        return
      }
    }
    $errorMessage_name$$ = "goog.require could not find: " + $errorMessage_name$$;
    goog.global.console && goog.global.console.error($errorMessage_name$$);
    throw Error($errorMessage_name$$);
  }
};
goog.basePath = "";
goog.nullFunction = function $goog$nullFunction$() {
};
goog.identityFunction = function $goog$identityFunction$($var_args$$) {
  return $var_args$$
};
goog.abstractMethod = function $goog$abstractMethod$() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function $goog$addSingletonGetter$($ctor$$) {
  $ctor$$.getInstance = function $$ctor$$$getInstance$() {
    return $ctor$$.instance_ || ($ctor$$.instance_ = new $ctor$$)
  }
};
!COMPILED && goog.ENABLE_DEBUG_LOADER && (goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function $goog$inHtmlDocument_$() {
  var $doc$$ = goog.global.document;
  return typeof $doc$$ != "undefined" && "write" in $doc$$
}, goog.findBasePath_ = function $goog$findBasePath_$() {
  if(goog.global.CLOSURE_BASE_PATH) {
    goog.basePath = goog.global.CLOSURE_BASE_PATH
  }else {
    if(goog.inHtmlDocument_()) {
      for(var $scripts$$ = goog.global.document.getElementsByTagName("script"), $i$$ = $scripts$$.length - 1;$i$$ >= 0;--$i$$) {
        var $src$$ = $scripts$$[$i$$].src, $l_qmark$$ = $src$$.lastIndexOf("?"), $l_qmark$$ = $l_qmark$$ == -1 ? $src$$.length : $l_qmark$$;
        if($src$$.substr($l_qmark$$ - 7, 7) == "base.js") {
          goog.basePath = $src$$.substr(0, $l_qmark$$ - 7);
          break
        }
      }
    }
  }
}, goog.importScript_ = function $goog$importScript_$($src$$) {
  var $importScript$$ = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
  !goog.dependencies_.written[$src$$] && $importScript$$($src$$) && (goog.dependencies_.written[$src$$] = true)
}, goog.writeScriptTag_ = function $goog$writeScriptTag_$($src$$) {
  if(goog.inHtmlDocument_()) {
    goog.global.document.write('<script type="text/javascript" src="' + $src$$ + '"><\/script>');
    return true
  }
  return false
}, goog.writeScripts_ = function $goog$writeScripts_$() {
  function $visitNode$$($path$$) {
    if(!($path$$ in $deps$$.written)) {
      if(!($path$$ in $deps$$.visited)) {
        $deps$$.visited[$path$$] = true;
        if($path$$ in $deps$$.requires) {
          for(var $requireName$$ in $deps$$.requires[$path$$]) {
            if(!goog.isProvided_($requireName$$)) {
              if($requireName$$ in $deps$$.nameToPath) {
                $visitNode$$($deps$$.nameToPath[$requireName$$])
              }else {
                throw Error("Undefined nameToPath for " + $requireName$$);
              }
            }
          }
        }
      }
      if(!($path$$ in $seenScript$$)) {
        $seenScript$$[$path$$] = true;
        $scripts$$.push($path$$)
      }
    }
  }
  var $scripts$$ = [], $seenScript$$ = {}, $deps$$ = goog.dependencies_, $i$$3_path$$;
  for($i$$3_path$$ in goog.included_) {
    $deps$$.written[$i$$3_path$$] || $visitNode$$($i$$3_path$$)
  }
  for($i$$3_path$$ = 0;$i$$3_path$$ < $scripts$$.length;$i$$3_path$$++) {
    if($scripts$$[$i$$3_path$$]) {
      goog.importScript_(goog.basePath + $scripts$$[$i$$3_path$$])
    }else {
      throw Error("Undefined script input");
    }
  }
}, goog.getPathFromDeps_ = function $goog$getPathFromDeps_$($rule$$) {
  return $rule$$ in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[$rule$$] : null
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.typeOf = function $goog$typeOf$($value$$) {
  var $s$$ = typeof $value$$;
  if($s$$ == "object") {
    if($value$$) {
      if($value$$ instanceof Array) {
        return"array"
      }
      if($value$$ instanceof Object) {
        return $s$$
      }
      var $className$$ = Object.prototype.toString.call($value$$);
      if($className$$ == "[object Window]") {
        return"object"
      }
      if($className$$ == "[object Array]" || typeof $value$$.length == "number" && typeof $value$$.splice != "undefined" && typeof $value$$.propertyIsEnumerable != "undefined" && !$value$$.propertyIsEnumerable("splice")) {
        return"array"
      }
      if($className$$ == "[object Function]" || typeof $value$$.call != "undefined" && typeof $value$$.propertyIsEnumerable != "undefined" && !$value$$.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if($s$$ == "function" && typeof $value$$.call == "undefined") {
      return"object"
    }
  }
  return $s$$
};
goog.propertyIsEnumerableCustom_ = function $goog$propertyIsEnumerableCustom_$($object$$, $propName$$) {
  if($propName$$ in $object$$) {
    for(var $key$$ in $object$$) {
      if($key$$ == $propName$$ && Object.prototype.hasOwnProperty.call($object$$, $propName$$)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function $goog$propertyIsEnumerable_$($object$$, $propName$$) {
  return $object$$ instanceof Object ? Object.prototype.propertyIsEnumerable.call($object$$, $propName$$) : goog.propertyIsEnumerableCustom_($object$$, $propName$$)
};
goog.isDef = function $goog$isDef$($val$$) {
  return $val$$ !== void 0
};
goog.isNull = function $goog$isNull$($val$$) {
  return $val$$ === null
};
goog.isDefAndNotNull = function $goog$isDefAndNotNull$($val$$) {
  return $val$$ != null
};
goog.isArray = function $goog$isArray$($val$$) {
  return goog.typeOf($val$$) == "array"
};
goog.isArrayLike = function $goog$isArrayLike$($val$$) {
  var $type$$ = goog.typeOf($val$$);
  return $type$$ == "array" || $type$$ == "object" && typeof $val$$.length == "number"
};
goog.isDateLike = function $goog$isDateLike$($val$$) {
  return goog.isObject($val$$) && typeof $val$$.getFullYear == "function"
};
goog.isString = function $goog$isString$($val$$) {
  return typeof $val$$ == "string"
};
goog.isBoolean = function $goog$isBoolean$($val$$) {
  return typeof $val$$ == "boolean"
};
goog.isNumber = function $goog$isNumber$($val$$) {
  return typeof $val$$ == "number"
};
goog.isFunction = function $goog$isFunction$($val$$) {
  return goog.typeOf($val$$) == "function"
};
goog.isObject = function $goog$isObject$($type$$49_val$$) {
  $type$$49_val$$ = goog.typeOf($type$$49_val$$);
  return $type$$49_val$$ == "object" || $type$$49_val$$ == "array" || $type$$49_val$$ == "function"
};
goog.getUid = function $goog$getUid$($obj$$) {
  return $obj$$[goog.UID_PROPERTY_] || ($obj$$[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function $goog$removeUid$($obj$$) {
  "removeAttribute" in $obj$$ && $obj$$.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete $obj$$[goog.UID_PROPERTY_]
  }catch($ex$$) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function $goog$cloneObject$($obj$$) {
  var $clone_type$$ = goog.typeOf($obj$$);
  if($clone_type$$ == "object" || $clone_type$$ == "array") {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone_type$$ = $clone_type$$ == "array" ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone_type$$[$key$$] = goog.cloneObject($obj$$[$key$$])
    }
    return $clone_type$$
  }
  return $obj$$
};
goog.bindNative_ = function $goog$bindNative_$($fn$$, $selfObj$$, $var_args$$) {
  return $fn$$.call.apply($fn$$.bind, arguments)
};
goog.bindJs_ = function $goog$bindJs_$($fn$$, $selfObj$$, $var_args$$) {
  if(!$fn$$) {
    throw Error();
  }
  if(arguments.length > 2) {
    var $boundArgs$$ = Array.prototype.slice.call(arguments, 2);
    return function() {
      var $newArgs$$ = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply($newArgs$$, $boundArgs$$);
      return $fn$$.apply($selfObj$$, $newArgs$$)
    }
  }
  return function() {
    return $fn$$.apply($selfObj$$, arguments)
  }
};
goog.bind = function $goog$bind$($fn$$, $selfObj$$, $var_args$$) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function $goog$partial$($fn$$, $var_args$$) {
  var $args$$ = Array.prototype.slice.call(arguments, 1);
  return function() {
    var $newArgs$$ = Array.prototype.slice.call(arguments);
    $newArgs$$.unshift.apply($newArgs$$, $args$$);
    return $fn$$.apply(this, $newArgs$$)
  }
};
goog.mixin = function $goog$mixin$($target$$, $source$$) {
  for(var $x$$ in $source$$) {
    $target$$[$x$$] = $source$$[$x$$]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function $goog$globalEval$($script$$) {
  if(goog.global.execScript) {
    goog.global.execScript($script$$, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global._et_ != "undefined") {
          delete goog.global._et_;
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval($script$$)
      }else {
        var $doc$$ = goog.global.document, $scriptElt$$ = $doc$$.createElement("script");
        $scriptElt$$.type = "text/javascript";
        $scriptElt$$.defer = false;
        $scriptElt$$.appendChild($doc$$.createTextNode($script$$));
        $doc$$.body.appendChild($scriptElt$$);
        $doc$$.body.removeChild($scriptElt$$)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function $goog$getCssName$($className$$, $opt_modifier$$) {
  var $getMapping$$ = function $$getMapping$$$($cssName$$) {
    return goog.cssNameMapping_[$cssName$$] || $cssName$$
  }, $rename_renameByParts$$ = function $$rename_renameByParts$$$($cssName$$1_parts$$) {
    for(var $cssName$$1_parts$$ = $cssName$$1_parts$$.split("-"), $mapped$$ = [], $i$$ = 0;$i$$ < $cssName$$1_parts$$.length;$i$$++) {
      $mapped$$.push($getMapping$$($cssName$$1_parts$$[$i$$]))
    }
    return $mapped$$.join("-")
  }, $rename_renameByParts$$ = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? $getMapping$$ : $rename_renameByParts$$ : function($a$$) {
    return $a$$
  };
  return $opt_modifier$$ ? $className$$ + "-" + $rename_renameByParts$$($opt_modifier$$) : $rename_renameByParts$$($className$$)
};
goog.setCssNameMapping = function $goog$setCssNameMapping$($mapping$$, $opt_style$$) {
  goog.cssNameMapping_ = $mapping$$;
  goog.cssNameMappingStyle_ = $opt_style$$
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function $goog$getMsg$($str$$, $opt_values$$) {
  var $values$$ = $opt_values$$ || {}, $key$$;
  for($key$$ in $values$$) {
    var $value$$ = ("" + $values$$[$key$$]).replace(/\$/g, "$$$$"), $str$$ = $str$$.replace(RegExp("\\{\\$" + $key$$ + "\\}", "gi"), $value$$)
  }
  return $str$$
};
goog.exportSymbol = function $goog$exportSymbol$($publicPath$$, $object$$, $opt_objectToExportTo$$) {
  goog.exportPath_($publicPath$$, $object$$, $opt_objectToExportTo$$)
};
goog.exportProperty = function $goog$exportProperty$($object$$, $publicName$$, $symbol$$) {
  $object$$[$publicName$$] = $symbol$$
};
goog.inherits = function $goog$inherits$($childCtor$$, $parentCtor$$) {
  function $tempCtor$$() {
  }
  $tempCtor$$.prototype = $parentCtor$$.prototype;
  $childCtor$$.superClass_ = $parentCtor$$.prototype;
  $childCtor$$.prototype = new $tempCtor$$;
  $childCtor$$.prototype.constructor = $childCtor$$
};
goog.base = function $goog$base$($me$$, $opt_methodName$$, $var_args$$) {
  var $caller$$ = arguments.callee.caller;
  if($caller$$.superClass_) {
    return $caller$$.superClass_.constructor.apply($me$$, Array.prototype.slice.call(arguments, 1))
  }
  for(var $args$$ = Array.prototype.slice.call(arguments, 2), $foundCaller$$ = false, $ctor$$ = $me$$.constructor;$ctor$$;$ctor$$ = $ctor$$.superClass_ && $ctor$$.superClass_.constructor) {
    if($ctor$$.prototype[$opt_methodName$$] === $caller$$) {
      $foundCaller$$ = true
    }else {
      if($foundCaller$$) {
        return $ctor$$.prototype[$opt_methodName$$].apply($me$$, $args$$)
      }
    }
  }
  if($me$$[$opt_methodName$$] === $caller$$) {
    return $me$$.constructor.prototype[$opt_methodName$$].apply($me$$, $args$$)
  }
  throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function $goog$scope$($fn$$) {
  $fn$$.call(goog.global)
};
goog.object = {};
goog.object.forEach = function $goog$object$forEach$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
};
goog.object.filter = function $goog$object$filter$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$) && ($res$$[$key$$] = $obj$$[$key$$])
  }
  return $res$$
};
goog.object.map = function $goog$object$map$($obj$$, $f$$, $opt_obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)
  }
  return $res$$
};
goog.object.some = function $goog$object$some$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!0
    }
  }
  return!1
};
goog.object.every = function $goog$object$every$($obj$$, $f$$, $opt_obj$$) {
  for(var $key$$ in $obj$$) {
    if(!$f$$.call($opt_obj$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return!1
    }
  }
  return!0
};
goog.object.getCount = function $goog$object$getCount$($obj$$) {
  var $rv$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $rv$$++
  }
  return $rv$$
};
goog.object.getAnyKey = function $goog$object$getAnyKey$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $key$$
  }
};
goog.object.getAnyValue = function $goog$object$getAnyValue$($obj$$) {
  for(var $key$$ in $obj$$) {
    return $obj$$[$key$$]
  }
};
goog.object.contains = function $goog$object$contains$($obj$$, $val$$) {
  return goog.object.containsValue($obj$$, $val$$)
};
goog.object.getValues = function $goog$object$getValues$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.getKeys = function $goog$object$getKeys$($obj$$) {
  var $res$$ = [], $i$$ = 0, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$i$$++] = $key$$
  }
  return $res$$
};
goog.object.getValueByKeys = function $goog$object$getValueByKeys$($obj$$, $var_args$$) {
  for(var $i$$ = goog.isArrayLike($var_args$$), $keys$$ = $i$$ ? $var_args$$ : arguments, $i$$ = $i$$ ? 0 : 1;$i$$ < $keys$$.length && !($obj$$ = $obj$$[$keys$$[$i$$]], !goog.isDef($obj$$));$i$$++) {
  }
  return $obj$$
};
goog.object.containsKey = function $goog$object$containsKey$($obj$$, $key$$) {
  return $key$$ in $obj$$
};
goog.object.containsValue = function $goog$object$containsValue$($obj$$, $val$$) {
  for(var $key$$ in $obj$$) {
    if($obj$$[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.object.findKey = function $goog$object$findKey$($obj$$, $f$$, $opt_this$$) {
  for(var $key$$ in $obj$$) {
    if($f$$.call($opt_this$$, $obj$$[$key$$], $key$$, $obj$$)) {
      return $key$$
    }
  }
};
goog.object.findValue = function $goog$object$findValue$($obj$$, $f$$6_key$$, $opt_this$$) {
  return($f$$6_key$$ = goog.object.findKey($obj$$, $f$$6_key$$, $opt_this$$)) && $obj$$[$f$$6_key$$]
};
goog.object.isEmpty = function $goog$object$isEmpty$($obj$$) {
  for(var $key$$ in $obj$$) {
    return!1
  }
  return!0
};
goog.object.clear = function $goog$object$clear$($obj$$) {
  for(var $i$$ in $obj$$) {
    delete $obj$$[$i$$]
  }
};
goog.object.remove = function $goog$object$remove$($obj$$, $key$$) {
  var $rv$$;
  ($rv$$ = $key$$ in $obj$$) && delete $obj$$[$key$$];
  return $rv$$
};
goog.object.add = function $goog$object$add$($obj$$, $key$$, $val$$) {
  if($key$$ in $obj$$) {
    throw Error('The object already contains the key "' + $key$$ + '"');
  }
  goog.object.set($obj$$, $key$$, $val$$)
};
goog.object.get = function $goog$object$get$($obj$$, $key$$, $opt_val$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $opt_val$$
};
goog.object.set = function $goog$object$set$($obj$$, $key$$, $value$$) {
  $obj$$[$key$$] = $value$$
};
goog.object.setIfUndefined = function $goog$object$setIfUndefined$($obj$$, $key$$, $value$$) {
  return $key$$ in $obj$$ ? $obj$$[$key$$] : $obj$$[$key$$] = $value$$
};
goog.object.clone = function $goog$object$clone$($obj$$) {
  var $res$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $res$$[$key$$] = $obj$$[$key$$]
  }
  return $res$$
};
goog.object.unsafeClone = function $goog$object$unsafeClone$($obj$$) {
  var $clone$$1_type$$ = goog.typeOf($obj$$);
  if("object" == $clone$$1_type$$ || "array" == $clone$$1_type$$) {
    if($obj$$.clone) {
      return $obj$$.clone()
    }
    var $clone$$1_type$$ = "array" == $clone$$1_type$$ ? [] : {}, $key$$;
    for($key$$ in $obj$$) {
      $clone$$1_type$$[$key$$] = goog.object.unsafeClone($obj$$[$key$$])
    }
    return $clone$$1_type$$
  }
  return $obj$$
};
goog.object.transpose = function $goog$object$transpose$($obj$$) {
  var $transposed$$ = {}, $key$$;
  for($key$$ in $obj$$) {
    $transposed$$[$obj$$[$key$$]] = $key$$
  }
  return $transposed$$
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function $goog$object$extend$($target$$, $var_args$$) {
  for(var $key$$, $source$$, $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    $source$$ = arguments[$i$$];
    for($key$$ in $source$$) {
      $target$$[$key$$] = $source$$[$key$$]
    }
    for(var $j$$ = 0;$j$$ < goog.object.PROTOTYPE_FIELDS_.length;$j$$++) {
      $key$$ = goog.object.PROTOTYPE_FIELDS_[$j$$], Object.prototype.hasOwnProperty.call($source$$, $key$$) && ($target$$[$key$$] = $source$$[$key$$])
    }
  }
};
goog.object.create = function $goog$object$create$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if($argLength$$ % 2) {
    throw Error("Uneven number of arguments");
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
    $rv$$[arguments[$i$$]] = arguments[$i$$ + 1]
  }
  return $rv$$
};
goog.object.createSet = function $goog$object$createSet$($var_args$$) {
  var $argLength$$ = arguments.length;
  if(1 == $argLength$$ && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $argLength$$;$i$$++) {
    $rv$$[arguments[$i$$]] = !0
  }
  return $rv$$
};
if(typeof fyre=="undefined"){var fyre={};}goog.object.extend(fyre,{v1:{}, conv:{}});
goog.exportSymbol("fyre.conv.config", fyre.conv.config);
fyre.conv.config = {bootstrapS3Prefix:"", bootstrapS3Host:"http://data.bootstrap.fyre.co", API1:"/api/v1.1/", API2:"/api/v3.0/", VERSION_COOKIE:"fyre-version", AUTH_COOKIE:"fyre-auth", CUSTOM_AUTH_COOKIE:"fyre-customauth", LIVECOUNT_COOKIE:"fyre-livecount", defaultAvatar:"http://livefyre-avatar.s3.amazonaws.com/a/anon/50.jpg", defaultAvatarSize:50, logging:{level:"WARNING"}, network:"livefyre.com", FYRENETWORK:"livefyre.com", customNetwork:!1, servers:{}, setDomain:function $fyre$conv$config$setDomain$($domain$$) {
  var $s$$ = fyre.conv.config.servers;
  $s$$.domain = $domain$$;
  $s$$.topLevel = "http://" + $domain$$;
  $s$$.assets = "http://zor.fyre.co/wjs";
  $s$$.admin = "http://admin." + $domain$$;
  $s$$.quill = "http://quill." + $domain$$;
  $s$$.web = "http://www." + $domain$$;
  $s$$.bootstrap = "http://bootstrap." + $domain$$;
  $s$$.stream = "http://stream1." + $domain$$
}, setNetwork:function $fyre$conv$config$setNetwork$($network$$) {
  fyre.conv.config.setDomain($network$$);
  /.*livefyre.com$/.test($network$$) || (fyre.conv.config.network = $network$$, fyre.conv.config.customNetwork = !0)
}, assetUrl:function $fyre$conv$config$assetUrl$($path$$) {
  var $parts$$ = [fyre.conv.config.servers.assets];
  fyre.conv.config.assetVersion && $parts$$.push("v3.0." + fyre.conv.config.assetVersion);
  $parts$$.push($path$$);
  return $parts$$.join("/")
}};
fyre.v1.config = fyre.conv.config;
fyre.conv.config.setDomain("livefyre.com");
fyre.conv.config.servers.livecount = "http://lc.livefyre.com";
fyre.conv.config.servers.tracking = "http://admin.livefyre.com";
fyre.v1.util = {};
fyre.v1.util.ScriptLoader = {};
fyre.v1.util.ScriptLoader.loadCSS = function $fyre$v1$util$ScriptLoader$loadCSS$($src$$, $doc$$, $attrs$$) {
  var $doc$$ = $doc$$ || document, $head$$ = $doc$$.getElementsByTagName("head")[0], $link$$ = $doc$$.createElement("link");
  fyre.v1.util.ScriptLoader.existsOnPage("link", "href", $src$$, $doc$$) || ($head$$ = $doc$$.getElementsByTagName("head")[0], $link$$ = $doc$$.createElement("link"), $link$$.rel = "stylesheet", $link$$.type = "text/css", $link$$.href = $src$$, $link$$.media = "all", goog.isObject($attrs$$) && goog.object.extend($link$$, $attrs$$), $head$$.appendChild($link$$))
};
fyre.v1.util.ScriptLoader.loadScript = function $fyre$v1$util$ScriptLoader$loadScript$($src$$, $doc$$5_script$$, $attrs$$) {
  var $head$$, $doc$$5_script$$ = $doc$$5_script$$ || document;
  fyre.v1.util.ScriptLoader.existsOnPage("script", "src", $src$$, $doc$$5_script$$) || ($head$$ = $doc$$5_script$$.getElementsByTagName("head")[0], $doc$$5_script$$ = $doc$$5_script$$.createElement("script"), $doc$$5_script$$.type = "text/javascript", $doc$$5_script$$.src = $src$$, goog.isObject($attrs$$) && goog.object.extend($doc$$5_script$$, $attrs$$), $head$$.appendChild($doc$$5_script$$))
};
fyre.v1.util.ScriptLoader.existsOnPage = function $fyre$v1$util$ScriptLoader$existsOnPage$($tag_tags$$, $attr$$, $val$$, $doc$$) {
  for(var $doc$$ = $doc$$ || document, $i$$ = 0, $tag_tags$$ = $doc$$.getElementsByTagName($tag_tags$$), $doc$$ = $tag_tags$$.length, $element$$;$i$$ < $doc$$;$i$$++) {
    if($element$$ = $tag_tags$$[$i$$], goog.isString($element$$[$attr$$]) && -1 < $element$$[$attr$$].indexOf($val$$)) {
      return!0
    }
  }
  return!1
};
goog.string = {};
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function $goog$string$startsWith$($str$$, $prefix$$) {
  return 0 == $str$$.lastIndexOf($prefix$$, 0)
};
goog.string.endsWith = function $goog$string$endsWith$($str$$, $suffix$$) {
  var $l$$ = $str$$.length - $suffix$$.length;
  return 0 <= $l$$ && $str$$.indexOf($suffix$$, $l$$) == $l$$
};
goog.string.caseInsensitiveStartsWith = function $goog$string$caseInsensitiveStartsWith$($str$$, $prefix$$) {
  return 0 == goog.string.caseInsensitiveCompare($prefix$$, $str$$.substr(0, $prefix$$.length))
};
goog.string.caseInsensitiveEndsWith = function $goog$string$caseInsensitiveEndsWith$($str$$, $suffix$$) {
  return 0 == goog.string.caseInsensitiveCompare($suffix$$, $str$$.substr($str$$.length - $suffix$$.length, $suffix$$.length))
};
goog.string.subs = function $goog$string$subs$($str$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $replacement$$ = String(arguments[$i$$]).replace(/\$/g, "$$$$"), $str$$ = $str$$.replace(/\%s/, $replacement$$)
  }
  return $str$$
};
goog.string.collapseWhitespace = function $goog$string$collapseWhitespace$($str$$) {
  return $str$$.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function $goog$string$isEmpty$($str$$) {
  return/^[\s\xa0]*$/.test($str$$)
};
goog.string.isEmptySafe = function $goog$string$isEmptySafe$($str$$) {
  return goog.string.isEmpty(goog.string.makeSafe($str$$))
};
goog.string.isBreakingWhitespace = function $goog$string$isBreakingWhitespace$($str$$) {
  return!/[^\t\n\r ]/.test($str$$)
};
goog.string.isAlpha = function $goog$string$isAlpha$($str$$) {
  return!/[^a-zA-Z]/.test($str$$)
};
goog.string.isNumeric = function $goog$string$isNumeric$($str$$) {
  return!/[^0-9]/.test($str$$)
};
goog.string.isAlphaNumeric = function $goog$string$isAlphaNumeric$($str$$) {
  return!/[^a-zA-Z0-9]/.test($str$$)
};
goog.string.isSpace = function $goog$string$isSpace$($ch$$) {
  return" " == $ch$$
};
goog.string.isUnicodeChar = function $goog$string$isUnicodeChar$($ch$$) {
  return 1 == $ch$$.length && " " <= $ch$$ && "~" >= $ch$$ || "\u0080" <= $ch$$ && "\ufffd" >= $ch$$
};
goog.string.stripNewlines = function $goog$string$stripNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function $goog$string$canonicalizeNewlines$($str$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function $goog$string$normalizeWhitespace$($str$$) {
  return $str$$.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function $goog$string$normalizeSpaces$($str$$) {
  return $str$$.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.collapseBreakingSpaces = function $goog$string$collapseBreakingSpaces$($str$$) {
  return $str$$.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
};
goog.string.trim = function $goog$string$trim$($str$$) {
  return $str$$.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function $goog$string$trimLeft$($str$$) {
  return $str$$.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function $goog$string$trimRight$($str$$) {
  return $str$$.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function $goog$string$caseInsensitiveCompare$($str1$$, $str2$$) {
  var $test1$$ = String($str1$$).toLowerCase(), $test2$$ = String($str2$$).toLowerCase();
  return $test1$$ < $test2$$ ? -1 : $test1$$ == $test2$$ ? 0 : 1
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function $goog$string$numerateCompare$($str1$$, $str2$$) {
  if($str1$$ == $str2$$) {
    return 0
  }
  if(!$str1$$) {
    return-1
  }
  if(!$str2$$) {
    return 1
  }
  for(var $num1_tokens1$$ = $str1$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $num2_tokens2$$ = $str2$$.toLowerCase().match(goog.string.numerateCompareRegExp_), $count$$ = Math.min($num1_tokens1$$.length, $num2_tokens2$$.length), $i$$ = 0;$i$$ < $count$$;$i$$++) {
    var $a$$ = $num1_tokens1$$[$i$$], $b$$ = $num2_tokens2$$[$i$$];
    if($a$$ != $b$$) {
      return $num1_tokens1$$ = parseInt($a$$, 10), !isNaN($num1_tokens1$$) && ($num2_tokens2$$ = parseInt($b$$, 10), !isNaN($num2_tokens2$$) && $num1_tokens1$$ - $num2_tokens2$$) ? $num1_tokens1$$ - $num2_tokens2$$ : $a$$ < $b$$ ? -1 : 1
    }
  }
  return $num1_tokens1$$.length != $num2_tokens2$$.length ? $num1_tokens1$$.length - $num2_tokens2$$.length : $str1$$ < $str2$$ ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function $goog$string$urlEncode$($str$$) {
  $str$$ = String($str$$);
  return!goog.string.encodeUriRegExp_.test($str$$) ? encodeURIComponent($str$$) : $str$$
};
goog.string.urlDecode = function $goog$string$urlDecode$($str$$) {
  return decodeURIComponent($str$$.replace(/\+/g, " "))
};
goog.string.newLineToBr = function $goog$string$newLineToBr$($str$$, $opt_xml$$) {
  return $str$$.replace(/(\r\n|\r|\n)/g, $opt_xml$$ ? "<br />" : "<br>")
};
goog.string.htmlEscape = function $goog$string$htmlEscape$($str$$, $opt_isLikelyToContainHtmlChars$$) {
  if($opt_isLikelyToContainHtmlChars$$) {
    return $str$$.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }
  if(!goog.string.allRe_.test($str$$)) {
    return $str$$
  }
  -1 != $str$$.indexOf("&") && ($str$$ = $str$$.replace(goog.string.amperRe_, "&amp;"));
  -1 != $str$$.indexOf("<") && ($str$$ = $str$$.replace(goog.string.ltRe_, "&lt;"));
  -1 != $str$$.indexOf(">") && ($str$$ = $str$$.replace(goog.string.gtRe_, "&gt;"));
  -1 != $str$$.indexOf('"') && ($str$$ = $str$$.replace(goog.string.quotRe_, "&quot;"));
  return $str$$
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function $goog$string$unescapeEntities$($str$$) {
  return goog.string.contains($str$$, "&") ? "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_($str$$) : goog.string.unescapePureXmlEntities_($str$$) : $str$$
};
goog.string.unescapeEntitiesUsingDom_ = function $goog$string$unescapeEntitiesUsingDom_$($str$$) {
  var $seen$$ = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, $div$$ = document.createElement("div");
  return $str$$.replace(goog.string.HTML_ENTITY_PATTERN_, function($s$$, $entity$$) {
    var $value$$ = $seen$$[$s$$];
    if($value$$) {
      return $value$$
    }
    if("#" == $entity$$.charAt(0)) {
      var $n$$ = Number("0" + $entity$$.substr(1));
      isNaN($n$$) || ($value$$ = String.fromCharCode($n$$))
    }
    $value$$ || ($div$$.innerHTML = $s$$ + " ", $value$$ = $div$$.firstChild.nodeValue.slice(0, -1));
    return $seen$$[$s$$] = $value$$
  })
};
goog.string.unescapePureXmlEntities_ = function $goog$string$unescapePureXmlEntities_$($str$$) {
  return $str$$.replace(/&([^;]+);/g, function($s$$, $entity$$) {
    switch($entity$$) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == $entity$$.charAt(0)) {
          var $n$$ = Number("0" + $entity$$.substr(1));
          if(!isNaN($n$$)) {
            return String.fromCharCode($n$$)
          }
        }
        return $s$$
    }
  })
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function $goog$string$whitespaceEscape$($str$$, $opt_xml$$) {
  return goog.string.newLineToBr($str$$.replace(/  /g, " &#160;"), $opt_xml$$)
};
goog.string.stripQuotes = function $goog$string$stripQuotes$($str$$, $quoteChars$$) {
  for(var $length$$ = $quoteChars$$.length, $i$$ = 0;$i$$ < $length$$;$i$$++) {
    var $quoteChar$$ = 1 == $length$$ ? $quoteChars$$ : $quoteChars$$.charAt($i$$);
    if($str$$.charAt(0) == $quoteChar$$ && $str$$.charAt($str$$.length - 1) == $quoteChar$$) {
      return $str$$.substring(1, $str$$.length - 1)
    }
  }
  return $str$$
};
goog.string.truncate = function $goog$string$truncate$($str$$, $chars$$, $opt_protectEscapedCharacters$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  $str$$.length > $chars$$ && ($str$$ = $str$$.substring(0, $chars$$ - 3) + "...");
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.truncateMiddle = function $goog$string$truncateMiddle$($str$$, $chars$$, $opt_protectEscapedCharacters$$, $half_opt_trailingChars$$) {
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.unescapeEntities($str$$));
  if($half_opt_trailingChars$$ && $str$$.length > $chars$$) {
    $half_opt_trailingChars$$ > $chars$$ && ($half_opt_trailingChars$$ = $chars$$);
    var $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $chars$$ - $half_opt_trailingChars$$) + "..." + $str$$.substring($endPoint_endPos$$)
  }else {
    $str$$.length > $chars$$ && ($half_opt_trailingChars$$ = Math.floor($chars$$ / 2), $endPoint_endPos$$ = $str$$.length - $half_opt_trailingChars$$, $str$$ = $str$$.substring(0, $half_opt_trailingChars$$ + $chars$$ % 2) + "..." + $str$$.substring($endPoint_endPos$$))
  }
  $opt_protectEscapedCharacters$$ && ($str$$ = goog.string.htmlEscape($str$$));
  return $str$$
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function $goog$string$quote$($s$$) {
  $s$$ = String($s$$);
  if($s$$.quote) {
    return $s$$.quote()
  }
  for(var $sb$$ = ['"'], $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    var $ch$$ = $s$$.charAt($i$$), $cc$$ = $ch$$.charCodeAt(0);
    $sb$$[$i$$ + 1] = goog.string.specialEscapeChars_[$ch$$] || (31 < $cc$$ && 127 > $cc$$ ? $ch$$ : goog.string.escapeChar($ch$$))
  }
  $sb$$.push('"');
  return $sb$$.join("")
};
goog.string.escapeString = function $goog$string$escapeString$($str$$) {
  for(var $sb$$ = [], $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    $sb$$[$i$$] = goog.string.escapeChar($str$$.charAt($i$$))
  }
  return $sb$$.join("")
};
goog.string.escapeChar = function $goog$string$escapeChar$($c$$) {
  if($c$$ in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[$c$$]
  }
  if($c$$ in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[$c$$] = goog.string.specialEscapeChars_[$c$$]
  }
  var $rv$$ = $c$$, $cc$$ = $c$$.charCodeAt(0);
  if(31 < $cc$$ && 127 > $cc$$) {
    $rv$$ = $c$$
  }else {
    if(256 > $cc$$) {
      if($rv$$ = "\\x", 16 > $cc$$ || 256 < $cc$$) {
        $rv$$ += "0"
      }
    }else {
      $rv$$ = "\\u", 4096 > $cc$$ && ($rv$$ += "0")
    }
    $rv$$ += $cc$$.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[$c$$] = $rv$$
};
goog.string.toMap = function $goog$string$toMap$($s$$) {
  for(var $rv$$ = {}, $i$$ = 0;$i$$ < $s$$.length;$i$$++) {
    $rv$$[$s$$.charAt($i$$)] = !0
  }
  return $rv$$
};
goog.string.contains = function $goog$string$contains$($s$$, $ss$$) {
  return-1 != $s$$.indexOf($ss$$)
};
goog.string.removeAt = function $goog$string$removeAt$($s$$, $index$$, $stringLength$$) {
  var $resultStr$$ = $s$$;
  0 <= $index$$ && ($index$$ < $s$$.length && 0 < $stringLength$$) && ($resultStr$$ = $s$$.substr(0, $index$$) + $s$$.substr($index$$ + $stringLength$$, $s$$.length - $index$$ - $stringLength$$));
  return $resultStr$$
};
goog.string.remove = function $goog$string$remove$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "");
  return $s$$.replace($re$$, "")
};
goog.string.removeAll = function $goog$string$removeAll$($s$$, $ss$$) {
  var $re$$ = RegExp(goog.string.regExpEscape($ss$$), "g");
  return $s$$.replace($re$$, "")
};
goog.string.regExpEscape = function $goog$string$regExpEscape$($s$$) {
  return String($s$$).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function $goog$string$repeat$($string$$, $length$$) {
  return Array($length$$ + 1).join($string$$)
};
goog.string.padNumber = function $goog$string$padNumber$($num$$4_s$$, $length$$, $index$$45_opt_precision$$) {
  $num$$4_s$$ = goog.isDef($index$$45_opt_precision$$) ? $num$$4_s$$.toFixed($index$$45_opt_precision$$) : String($num$$4_s$$);
  $index$$45_opt_precision$$ = $num$$4_s$$.indexOf(".");
  -1 == $index$$45_opt_precision$$ && ($index$$45_opt_precision$$ = $num$$4_s$$.length);
  return goog.string.repeat("0", Math.max(0, $length$$ - $index$$45_opt_precision$$)) + $num$$4_s$$
};
goog.string.makeSafe = function $goog$string$makeSafe$($obj$$) {
  return null == $obj$$ ? "" : String($obj$$)
};
goog.string.buildString = function $goog$string$buildString$($var_args$$) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function $goog$string$getRandomString$() {
  return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function $goog$string$compareVersions$($version1$$, $version2$$) {
  for(var $order_v1CompNum$$ = 0, $v1Subs$$ = goog.string.trim(String($version1$$)).split("."), $v2Subs$$ = goog.string.trim(String($version2$$)).split("."), $subCount$$ = Math.max($v1Subs$$.length, $v2Subs$$.length), $subIdx$$ = 0;0 == $order_v1CompNum$$ && $subIdx$$ < $subCount$$;$subIdx$$++) {
    var $v1Sub$$ = $v1Subs$$[$subIdx$$] || "", $v2Sub$$ = $v2Subs$$[$subIdx$$] || "", $v1CompParser$$ = RegExp("(\\d*)(\\D*)", "g"), $v2CompParser$$ = RegExp("(\\d*)(\\D*)", "g");
    do {
      var $v1Comp$$ = $v1CompParser$$.exec($v1Sub$$) || ["", "", ""], $v2Comp$$ = $v2CompParser$$.exec($v2Sub$$) || ["", "", ""];
      if(0 == $v1Comp$$[0].length && 0 == $v2Comp$$[0].length) {
        break
      }
      var $order_v1CompNum$$ = 0 == $v1Comp$$[1].length ? 0 : parseInt($v1Comp$$[1], 10), $v2CompNum$$ = 0 == $v2Comp$$[1].length ? 0 : parseInt($v2Comp$$[1], 10), $order_v1CompNum$$ = goog.string.compareElements_($order_v1CompNum$$, $v2CompNum$$) || goog.string.compareElements_(0 == $v1Comp$$[2].length, 0 == $v2Comp$$[2].length) || goog.string.compareElements_($v1Comp$$[2], $v2Comp$$[2])
    }while(0 == $order_v1CompNum$$)
  }
  return $order_v1CompNum$$
};
goog.string.compareElements_ = function $goog$string$compareElements_$($left$$, $right$$) {
  return $left$$ < $right$$ ? -1 : $left$$ > $right$$ ? 1 : 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function $goog$string$hashCode$($str$$) {
  for(var $result$$ = 0, $i$$ = 0;$i$$ < $str$$.length;++$i$$) {
    $result$$ = 31 * $result$$ + $str$$.charCodeAt($i$$), $result$$ %= goog.string.HASHCODE_MAX_
  }
  return $result$$
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function $goog$string$createUniqueString$() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function $goog$string$toNumber$($str$$) {
  var $num$$ = Number($str$$);
  return 0 == $num$$ && goog.string.isEmpty($str$$) ? NaN : $num$$
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function $goog$string$toCamelCase$($str$$) {
  return goog.string.toCamelCaseCache_[$str$$] || (goog.string.toCamelCaseCache_[$str$$] = String($str$$).replace(/\-([a-z])/g, function($all$$, $match$$) {
    return $match$$.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function $goog$string$toSelectorCase$($str$$) {
  return goog.string.toSelectorCaseCache_[$str$$] || (goog.string.toSelectorCaseCache_[$str$$] = String($str$$).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function $goog$userAgent$getUserAgentString$() {
  return goog.global.navigator ? goog.global.navigator.userAgent : null
};
goog.userAgent.getNavigator = function $goog$userAgent$getNavigator$() {
  return goog.global.navigator
};
goog.userAgent.init_ = function $goog$userAgent$init_$() {
  goog.userAgent.detectedOpera_ = !1;
  goog.userAgent.detectedIe_ = !1;
  goog.userAgent.detectedWebkit_ = !1;
  goog.userAgent.detectedMobile_ = !1;
  goog.userAgent.detectedGecko_ = !1;
  var $ua$$;
  if(!goog.userAgent.BROWSER_KNOWN_ && ($ua$$ = goog.userAgent.getUserAgentString())) {
    var $navigator$$ = goog.userAgent.getNavigator();
    goog.userAgent.detectedOpera_ = 0 == $ua$$.indexOf("Opera");
    goog.userAgent.detectedIe_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("MSIE");
    goog.userAgent.detectedWebkit_ = !goog.userAgent.detectedOpera_ && -1 != $ua$$.indexOf("WebKit");
    goog.userAgent.detectedMobile_ = goog.userAgent.detectedWebkit_ && -1 != $ua$$.indexOf("Mobile");
    goog.userAgent.detectedGecko_ = !goog.userAgent.detectedOpera_ && !goog.userAgent.detectedWebkit_ && "Gecko" == $navigator$$.product
  }
};
goog.userAgent.BROWSER_KNOWN_ || goog.userAgent.init_();
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.userAgent.detectedOpera_;
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.userAgent.detectedIe_;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.userAgent.detectedGecko_;
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.userAgent.detectedWebkit_;
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.detectedMobile_;
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function $goog$userAgent$determinePlatform_$() {
  var $navigator$$ = goog.userAgent.getNavigator();
  return $navigator$$ && $navigator$$.platform || ""
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11;
goog.userAgent.initPlatform_ = function $goog$userAgent$initPlatform_$() {
  goog.userAgent.detectedMac_ = goog.string.contains(goog.userAgent.PLATFORM, "Mac");
  goog.userAgent.detectedWindows_ = goog.string.contains(goog.userAgent.PLATFORM, "Win");
  goog.userAgent.detectedLinux_ = goog.string.contains(goog.userAgent.PLATFORM, "Linux");
  goog.userAgent.detectedX11_ = !!goog.userAgent.getNavigator() && goog.string.contains(goog.userAgent.getNavigator().appVersion || "", "X11")
};
goog.userAgent.PLATFORM_KNOWN_ || goog.userAgent.initPlatform_();
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.userAgent.detectedMac_;
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.userAgent.detectedWindows_;
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.detectedLinux_;
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.detectedX11_;
goog.userAgent.determineVersion_ = function $goog$userAgent$determineVersion_$() {
  var $arr$$10_operaVersion_version$$ = "", $docMode_re$$;
  goog.userAgent.OPERA && goog.global.opera ? ($arr$$10_operaVersion_version$$ = goog.global.opera.version, $arr$$10_operaVersion_version$$ = "function" == typeof $arr$$10_operaVersion_version$$ ? $arr$$10_operaVersion_version$$() : $arr$$10_operaVersion_version$$) : (goog.userAgent.GECKO ? $docMode_re$$ = /rv\:([^\);]+)(\)|;)/ : goog.userAgent.IE ? $docMode_re$$ = /MSIE\s+([^\);]+)(\)|;)/ : goog.userAgent.WEBKIT && ($docMode_re$$ = /WebKit\/(\S+)/), $docMode_re$$ && ($arr$$10_operaVersion_version$$ = 
  ($arr$$10_operaVersion_version$$ = $docMode_re$$.exec(goog.userAgent.getUserAgentString())) ? $arr$$10_operaVersion_version$$[1] : ""));
  return goog.userAgent.IE && ($docMode_re$$ = goog.userAgent.getDocumentMode_(), $docMode_re$$ > parseFloat($arr$$10_operaVersion_version$$)) ? String($docMode_re$$) : $arr$$10_operaVersion_version$$
};
goog.userAgent.getDocumentMode_ = function $goog$userAgent$getDocumentMode_$() {
  var $doc$$ = goog.global.document;
  return $doc$$ ? $doc$$.documentMode : void 0
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function $goog$userAgent$compare$($v1$$, $v2$$) {
  return goog.string.compareVersions($v1$$, $v2$$)
};
goog.userAgent.isVersionCache_ = {};
goog.userAgent.isVersion = function $goog$userAgent$isVersion$($version$$) {
  return goog.userAgent.isVersionCache_[$version$$] || (goog.userAgent.isVersionCache_[$version$$] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, $version$$))
};
goog.userAgent.isDocumentModeCache_ = {};
goog.userAgent.isDocumentMode = function $goog$userAgent$isDocumentMode$($documentMode$$) {
  return goog.userAgent.isDocumentModeCache_[$documentMode$$] || (goog.userAgent.isDocumentModeCache_[$documentMode$$] = goog.userAgent.IE && document.documentMode && document.documentMode >= $documentMode$$)
};
goog.net = {};
goog.net.Cookies = function $goog$net$Cookies$($context$$) {
  this.document_ = $context$$
};
goog.net.Cookies.MAX_COOKIE_LENGTH = 3950;
goog.net.Cookies.SPLIT_RE_ = /\s*;\s*/;
goog.net.Cookies.TEST_COOKIE_NAME_ = "COOKIES_TEST_";
goog.net.Cookies.prototype.isEnabled = function $goog$net$Cookies$$isEnabled$() {
  var $isEnabled$$ = this.isNavigatorCookieEnabled_();
  if($isEnabled$$ && goog.userAgent.WEBKIT) {
    var $cookieName$$ = goog.net.Cookies.TEST_COOKIE_NAME_ + goog.now();
    goog.net.cookies.set($cookieName$$, "1");
    if(!this.get($cookieName$$)) {
      return!1
    }
    this.remove($cookieName$$)
  }
  return $isEnabled$$
};
goog.net.Cookies.prototype.isValidName = function $goog$net$Cookies$$isValidName$($name$$) {
  return!/[;=\s]/.test($name$$)
};
goog.net.Cookies.prototype.isValidValue = function $goog$net$Cookies$$isValidValue$($value$$) {
  return!/[;\r\n]/.test($value$$)
};
goog.net.Cookies.prototype.set = function $goog$net$Cookies$$set$($name$$, $value$$, $expiresStr_opt_maxAge$$, $opt_path_pathStr$$, $domainStr_opt_domain$$, $opt_secure_secureStr$$) {
  if(!this.isValidName($name$$)) {
    throw Error('Invalid cookie name "' + $name$$ + '"');
  }
  if(!this.isValidValue($value$$)) {
    throw Error('Invalid cookie value "' + $value$$ + '"');
  }
  goog.isDef($expiresStr_opt_maxAge$$) || ($expiresStr_opt_maxAge$$ = -1);
  $domainStr_opt_domain$$ = $domainStr_opt_domain$$ ? ";domain=" + $domainStr_opt_domain$$ : "";
  $opt_path_pathStr$$ = $opt_path_pathStr$$ ? ";path=" + $opt_path_pathStr$$ : "";
  $opt_secure_secureStr$$ = $opt_secure_secureStr$$ ? ";secure" : "";
  $expiresStr_opt_maxAge$$ = 0 > $expiresStr_opt_maxAge$$ ? "" : 0 == $expiresStr_opt_maxAge$$ ? ";expires=" + (new Date(1970, 1, 1)).toUTCString() : ";expires=" + (new Date(goog.now() + 1E3 * $expiresStr_opt_maxAge$$)).toUTCString();
  this.setCookie_($name$$ + "=" + $value$$ + $domainStr_opt_domain$$ + $opt_path_pathStr$$ + $expiresStr_opt_maxAge$$ + $opt_secure_secureStr$$)
};
goog.net.Cookies.prototype.get = function $goog$net$Cookies$$get$($name$$, $opt_default$$) {
  for(var $nameEq$$ = $name$$ + "=", $parts$$ = this.getParts_(), $i$$ = 0, $part$$;$part$$ = $parts$$[$i$$];$i$$++) {
    if(0 == $part$$.indexOf($nameEq$$)) {
      return $part$$.substr($nameEq$$.length)
    }
  }
  return $opt_default$$
};
goog.net.Cookies.prototype.remove = function $goog$net$Cookies$$remove$($name$$, $opt_path$$, $opt_domain$$) {
  var $rv$$ = this.containsKey($name$$);
  this.set($name$$, "", 0, $opt_path$$, $opt_domain$$);
  return $rv$$
};
goog.net.Cookies.prototype.getKeys = function $goog$net$Cookies$$getKeys$() {
  return this.getKeyValues_().keys
};
goog.net.Cookies.prototype.getValues = function $goog$net$Cookies$$getValues$() {
  return this.getKeyValues_().values
};
goog.net.Cookies.prototype.isEmpty = function $goog$net$Cookies$$isEmpty$() {
  return!this.getCookie_()
};
goog.net.Cookies.prototype.getCount = function $goog$net$Cookies$$getCount$() {
  return!this.getCookie_() ? 0 : this.getParts_().length
};
goog.net.Cookies.prototype.containsKey = function $goog$net$Cookies$$containsKey$($key$$) {
  return goog.isDef(this.get($key$$))
};
goog.net.Cookies.prototype.containsValue = function $goog$net$Cookies$$containsValue$($value$$) {
  for(var $values$$ = this.getKeyValues_().values, $i$$ = 0;$i$$ < $values$$.length;$i$$++) {
    if($values$$[$i$$] == $value$$) {
      return!0
    }
  }
  return!1
};
goog.net.Cookies.prototype.clear = function $goog$net$Cookies$$clear$() {
  for(var $keys$$ = this.getKeyValues_().keys, $i$$ = $keys$$.length - 1;0 <= $i$$;$i$$--) {
    this.remove($keys$$[$i$$])
  }
};
goog.net.Cookies.prototype.setCookie_ = function $goog$net$Cookies$$setCookie_$($s$$) {
  this.document_.cookie = $s$$
};
goog.net.Cookies.prototype.getCookie_ = function $goog$net$Cookies$$getCookie_$() {
  return this.document_.cookie
};
goog.net.Cookies.prototype.getParts_ = function $goog$net$Cookies$$getParts_$() {
  return(this.getCookie_() || "").split(goog.net.Cookies.SPLIT_RE_)
};
goog.net.Cookies.prototype.isNavigatorCookieEnabled_ = function $goog$net$Cookies$$isNavigatorCookieEnabled_$() {
  return navigator.cookieEnabled
};
goog.net.Cookies.prototype.getKeyValues_ = function $goog$net$Cookies$$getKeyValues_$() {
  for(var $parts$$ = this.getParts_(), $keys$$ = [], $values$$ = [], $index$$, $part$$, $i$$ = 0;$part$$ = $parts$$[$i$$];$i$$++) {
    $index$$ = $part$$.indexOf("="), -1 == $index$$ ? ($keys$$.push(""), $values$$.push($part$$)) : ($keys$$.push($part$$.substring(0, $index$$)), $values$$.push($part$$.substring($index$$ + 1)))
  }
  return{keys:$keys$$, values:$values$$}
};
goog.net.cookies = new goog.net.Cookies(document);
goog.net.cookies.MAX_COOKIE_LENGTH = goog.net.Cookies.MAX_COOKIE_LENGTH;
goog.debug = {};
goog.debug.Error = function $goog$debug$Error$($opt_msg$$) {
  this.stack = Error().stack || "";
  $opt_msg$$ && (this.message = String($opt_msg$$))
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function $goog$asserts$AssertionError$($messagePattern$$, $messageArgs$$) {
  $messageArgs$$.unshift($messagePattern$$);
  goog.debug.Error.call(this, goog.string.subs.apply(null, $messageArgs$$));
  $messageArgs$$.shift();
  this.messagePattern = $messagePattern$$
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function $goog$asserts$doAssertFailure_$($defaultMessage$$, $defaultArgs$$, $givenMessage$$, $givenArgs$$) {
  var $message$$ = "Assertion failed";
  if($givenMessage$$) {
    var $message$$ = $message$$ + (": " + $givenMessage$$), $args$$ = $givenArgs$$
  }else {
    $defaultMessage$$ && ($message$$ += ": " + $defaultMessage$$, $args$$ = $defaultArgs$$)
  }
  throw new goog.asserts.AssertionError("" + $message$$, $args$$ || []);
};
goog.asserts.assert = function $goog$asserts$assert$($condition$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !$condition$$ && goog.asserts.doAssertFailure_("", null, $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $condition$$
};
goog.asserts.fail = function $goog$asserts$fail$($opt_message$$, $var_args$$) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + ($opt_message$$ ? ": " + $opt_message$$ : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function $goog$asserts$assertNumber$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isNumber($value$$) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertString = function $goog$asserts$assertString$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isString($value$$) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertFunction = function $goog$asserts$assertFunction$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isFunction($value$$) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertObject = function $goog$asserts$assertObject$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isObject($value$$) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertArray = function $goog$asserts$assertArray$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isArray($value$$) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertBoolean = function $goog$asserts$assertBoolean$($value$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !goog.isBoolean($value$$) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf($value$$), $value$$], $opt_message$$, Array.prototype.slice.call(arguments, 2));
  return $value$$
};
goog.asserts.assertInstanceof = function $goog$asserts$assertInstanceof$($value$$, $type$$, $opt_message$$, $var_args$$) {
  goog.asserts.ENABLE_ASSERTS && !($value$$ instanceof $type$$) && goog.asserts.doAssertFailure_("instanceof check failed.", null, $opt_message$$, Array.prototype.slice.call(arguments, 3))
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = !0;
goog.array.peek = function $goog$array$peek$($array$$) {
  return $array$$[$array$$.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call($arr$$, $obj$$, $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex_i$$24_opt_fromIndex$$) {
  $fromIndex_i$$24_opt_fromIndex$$ = null == $fromIndex_i$$24_opt_fromIndex$$ ? 0 : 0 > $fromIndex_i$$24_opt_fromIndex$$ ? Math.max(0, $arr$$.length + $fromIndex_i$$24_opt_fromIndex$$) : $fromIndex_i$$24_opt_fromIndex$$;
  if(goog.isString($arr$$)) {
    return!goog.isString($obj$$) || 1 != $obj$$.length ? -1 : $arr$$.indexOf($obj$$, $fromIndex_i$$24_opt_fromIndex$$)
  }
  for(;$fromIndex_i$$24_opt_fromIndex$$ < $arr$$.length;$fromIndex_i$$24_opt_fromIndex$$++) {
    if($fromIndex_i$$24_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex_i$$24_opt_fromIndex$$] === $obj$$) {
      return $fromIndex_i$$24_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function($arr$$, $obj$$, $opt_fromIndex$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call($arr$$, $obj$$, null == $opt_fromIndex$$ ? $arr$$.length - 1 : $opt_fromIndex$$)
} : function($arr$$, $obj$$, $fromIndex$$2_i$$25_opt_fromIndex$$) {
  $fromIndex$$2_i$$25_opt_fromIndex$$ = null == $fromIndex$$2_i$$25_opt_fromIndex$$ ? $arr$$.length - 1 : $fromIndex$$2_i$$25_opt_fromIndex$$;
  0 > $fromIndex$$2_i$$25_opt_fromIndex$$ && ($fromIndex$$2_i$$25_opt_fromIndex$$ = Math.max(0, $arr$$.length + $fromIndex$$2_i$$25_opt_fromIndex$$));
  if(goog.isString($arr$$)) {
    return!goog.isString($obj$$) || 1 != $obj$$.length ? -1 : $arr$$.lastIndexOf($obj$$, $fromIndex$$2_i$$25_opt_fromIndex$$)
  }
  for(;0 <= $fromIndex$$2_i$$25_opt_fromIndex$$;$fromIndex$$2_i$$25_opt_fromIndex$$--) {
    if($fromIndex$$2_i$$25_opt_fromIndex$$ in $arr$$ && $arr$$[$fromIndex$$2_i$$25_opt_fromIndex$$] === $obj$$) {
      return $fromIndex$$2_i$$25_opt_fromIndex$$
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.forEach.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)
  }
};
goog.array.forEachRight = function $goog$array$forEachRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$27_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$27_l$$ = $i$$27_l$$ - 1;0 <= $i$$27_l$$;--$i$$27_l$$) {
    $i$$27_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$27_l$$], $i$$27_l$$, $arr$$)
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.filter.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = [], $resLength$$ = 0, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$) {
      var $val$$ = $arr2$$[$i$$];
      $f$$.call($opt_obj$$, $val$$, $i$$, $arr$$) && ($res$$[$resLength$$++] = $val$$)
    }
  }
  return $res$$
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.map.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $res$$ = Array($l$$), $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $i$$ in $arr2$$ && ($res$$[$i$$] = $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$))
  }
  return $res$$
};
goog.array.reduce = function $goog$array$reduce$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduce) {
    return $opt_obj$$ ? $arr$$.reduce(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduce($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEach($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.reduceRight = function $goog$array$reduceRight$($arr$$, $f$$, $val$$0$$, $opt_obj$$) {
  if($arr$$.reduceRight) {
    return $opt_obj$$ ? $arr$$.reduceRight(goog.bind($f$$, $opt_obj$$), $val$$0$$) : $arr$$.reduceRight($f$$, $val$$0$$)
  }
  var $rval$$ = $val$$0$$;
  goog.array.forEachRight($arr$$, function($val$$, $index$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$, $index$$, $arr$$)
  });
  return $rval$$
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.some.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!0
    }
  }
  return!1
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function($arr$$, $f$$, $opt_obj$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.every.call($arr$$, $f$$, $opt_obj$$)
} : function($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && !$f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return!1
    }
  }
  return!0
};
goog.array.find = function $goog$array$find$($arr$$, $f$$20_i$$, $opt_obj$$) {
  $f$$20_i$$ = goog.array.findIndex($arr$$, $f$$20_i$$, $opt_obj$$);
  return 0 > $f$$20_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$20_i$$) : $arr$$[$f$$20_i$$]
};
goog.array.findIndex = function $goog$array$findIndex$($arr$$, $f$$, $opt_obj$$) {
  for(var $l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($i$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$], $i$$, $arr$$)) {
      return $i$$
    }
  }
  return-1
};
goog.array.findRight = function $goog$array$findRight$($arr$$, $f$$22_i$$, $opt_obj$$) {
  $f$$22_i$$ = goog.array.findIndexRight($arr$$, $f$$22_i$$, $opt_obj$$);
  return 0 > $f$$22_i$$ ? null : goog.isString($arr$$) ? $arr$$.charAt($f$$22_i$$) : $arr$$[$f$$22_i$$]
};
goog.array.findIndexRight = function $goog$array$findIndexRight$($arr$$, $f$$, $opt_obj$$) {
  for(var $i$$35_l$$ = $arr$$.length, $arr2$$ = goog.isString($arr$$) ? $arr$$.split("") : $arr$$, $i$$35_l$$ = $i$$35_l$$ - 1;0 <= $i$$35_l$$;$i$$35_l$$--) {
    if($i$$35_l$$ in $arr2$$ && $f$$.call($opt_obj$$, $arr2$$[$i$$35_l$$], $i$$35_l$$, $arr$$)) {
      return $i$$35_l$$
    }
  }
  return-1
};
goog.array.contains = function $goog$array$contains$($arr$$, $obj$$) {
  return 0 <= goog.array.indexOf($arr$$, $obj$$)
};
goog.array.isEmpty = function $goog$array$isEmpty$($arr$$) {
  return 0 == $arr$$.length
};
goog.array.clear = function $goog$array$clear$($arr$$) {
  if(!goog.isArray($arr$$)) {
    for(var $i$$ = $arr$$.length - 1;0 <= $i$$;$i$$--) {
      delete $arr$$[$i$$]
    }
  }
  $arr$$.length = 0
};
goog.array.insert = function $goog$array$insert$($arr$$, $obj$$) {
  goog.array.contains($arr$$, $obj$$) || $arr$$.push($obj$$)
};
goog.array.insertAt = function $goog$array$insertAt$($arr$$, $obj$$, $opt_i$$) {
  goog.array.splice($arr$$, $opt_i$$, 0, $obj$$)
};
goog.array.insertArrayAt = function $goog$array$insertArrayAt$($arr$$, $elementsToAdd$$, $opt_i$$) {
  goog.partial(goog.array.splice, $arr$$, $opt_i$$, 0).apply(null, $elementsToAdd$$)
};
goog.array.insertBefore = function $goog$array$insertBefore$($arr$$, $obj$$, $opt_obj2$$) {
  var $i$$;
  2 == arguments.length || 0 > ($i$$ = goog.array.indexOf($arr$$, $opt_obj2$$)) ? $arr$$.push($obj$$) : goog.array.insertAt($arr$$, $obj$$, $i$$)
};
goog.array.remove = function $goog$array$remove$($arr$$, $obj$$) {
  var $i$$ = goog.array.indexOf($arr$$, $obj$$), $rv$$;
  ($rv$$ = 0 <= $i$$) && goog.array.removeAt($arr$$, $i$$);
  return $rv$$
};
goog.array.removeAt = function $goog$array$removeAt$($arr$$, $i$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 1 == goog.array.ARRAY_PROTOTYPE_.splice.call($arr$$, $i$$, 1).length
};
goog.array.removeIf = function $goog$array$removeIf$($arr$$, $f$$24_i$$, $opt_obj$$) {
  $f$$24_i$$ = goog.array.findIndex($arr$$, $f$$24_i$$, $opt_obj$$);
  return 0 <= $f$$24_i$$ ? (goog.array.removeAt($arr$$, $f$$24_i$$), !0) : !1
};
goog.array.concat = function $goog$array$concat$($var_args$$) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function $goog$array$clone$($arr$$) {
  if(goog.isArray($arr$$)) {
    return goog.array.concat($arr$$)
  }
  for(var $rv$$ = [], $i$$ = 0, $len$$ = $arr$$.length;$i$$ < $len$$;$i$$++) {
    $rv$$[$i$$] = $arr$$[$i$$]
  }
  return $rv$$
};
goog.array.toArray = function $goog$array$toArray$($object$$) {
  return goog.isArray($object$$) ? goog.array.concat($object$$) : goog.array.clone($object$$)
};
goog.array.extend = function $goog$array$extend$($arr1$$, $var_args$$) {
  for(var $i$$ = 1;$i$$ < arguments.length;$i$$++) {
    var $arr2$$ = arguments[$i$$], $isArrayLike$$;
    if(goog.isArray($arr2$$) || ($isArrayLike$$ = goog.isArrayLike($arr2$$)) && $arr2$$.hasOwnProperty("callee")) {
      $arr1$$.push.apply($arr1$$, $arr2$$)
    }else {
      if($isArrayLike$$) {
        for(var $len1$$ = $arr1$$.length, $len2$$ = $arr2$$.length, $j$$ = 0;$j$$ < $len2$$;$j$$++) {
          $arr1$$[$len1$$ + $j$$] = $arr2$$[$j$$]
        }
      }else {
        $arr1$$.push($arr2$$)
      }
    }
  }
};
goog.array.splice = function $goog$array$splice$($arr$$, $index$$, $howMany$$, $var_args$$) {
  goog.asserts.assert(null != $arr$$.length);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply($arr$$, goog.array.slice(arguments, 1))
};
goog.array.slice = function $goog$array$slice$($arr$$, $start$$, $opt_end$$) {
  goog.asserts.assert(null != $arr$$.length);
  return 2 >= arguments.length ? goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$) : goog.array.ARRAY_PROTOTYPE_.slice.call($arr$$, $start$$, $opt_end$$)
};
goog.array.removeDuplicates = function $goog$array$removeDuplicates$($arr$$, $opt_rv$$) {
  for(var $returnArray$$ = $opt_rv$$ || $arr$$, $seen$$ = {}, $cursorInsert$$ = 0, $cursorRead$$ = 0;$cursorRead$$ < $arr$$.length;) {
    var $current$$ = $arr$$[$cursorRead$$++], $key$$ = goog.isObject($current$$) ? "o" + goog.getUid($current$$) : (typeof $current$$).charAt(0) + $current$$;
    Object.prototype.hasOwnProperty.call($seen$$, $key$$) || ($seen$$[$key$$] = !0, $returnArray$$[$cursorInsert$$++] = $current$$)
  }
  $returnArray$$.length = $cursorInsert$$
};
goog.array.binarySearch = function $goog$array$binarySearch$($arr$$, $target$$, $opt_compareFn$$) {
  return goog.array.binarySearch_($arr$$, $opt_compareFn$$ || goog.array.defaultCompare, !1, $target$$)
};
goog.array.binarySelect = function $goog$array$binarySelect$($arr$$, $evaluator$$, $opt_obj$$) {
  return goog.array.binarySearch_($arr$$, $evaluator$$, !0, void 0, $opt_obj$$)
};
goog.array.binarySearch_ = function $goog$array$binarySearch_$($arr$$, $compareFn$$, $isEvaluator$$, $opt_target$$, $opt_selfObj$$) {
  for(var $left$$ = 0, $right$$ = $arr$$.length, $found$$;$left$$ < $right$$;) {
    var $middle$$ = $left$$ + $right$$ >> 1, $compareResult$$;
    $compareResult$$ = $isEvaluator$$ ? $compareFn$$.call($opt_selfObj$$, $arr$$[$middle$$], $middle$$, $arr$$) : $compareFn$$($opt_target$$, $arr$$[$middle$$]);
    0 < $compareResult$$ ? $left$$ = $middle$$ + 1 : ($right$$ = $middle$$, $found$$ = !$compareResult$$)
  }
  return $found$$ ? $left$$ : ~$left$$
};
goog.array.sort = function $goog$array$sort$($arr$$, $opt_compareFn$$) {
  goog.asserts.assert(null != $arr$$.length);
  goog.array.ARRAY_PROTOTYPE_.sort.call($arr$$, $opt_compareFn$$ || goog.array.defaultCompare)
};
goog.array.stableSort = function $goog$array$stableSort$($arr$$, $opt_compareFn$$) {
  for(var $i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = {index:$i$$, value:$arr$$[$i$$]}
  }
  var $valueCompareFn$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function stableCompareFn($obj1$$, $obj2$$) {
    return $valueCompareFn$$($obj1$$.value, $obj2$$.value) || $obj1$$.index - $obj2$$.index
  });
  for($i$$ = 0;$i$$ < $arr$$.length;$i$$++) {
    $arr$$[$i$$] = $arr$$[$i$$].value
  }
};
goog.array.sortObjectsByKey = function $goog$array$sortObjectsByKey$($arr$$, $key$$, $opt_compareFn$$) {
  var $compare$$ = $opt_compareFn$$ || goog.array.defaultCompare;
  goog.array.sort($arr$$, function($a$$, $b$$) {
    return $compare$$($a$$[$key$$], $b$$[$key$$])
  })
};
goog.array.isSorted = function $goog$array$isSorted$($arr$$, $compare$$1_opt_compareFn$$, $opt_strict$$) {
  for(var $compare$$1_opt_compareFn$$ = $compare$$1_opt_compareFn$$ || goog.array.defaultCompare, $i$$ = 1;$i$$ < $arr$$.length;$i$$++) {
    var $compareResult$$ = $compare$$1_opt_compareFn$$($arr$$[$i$$ - 1], $arr$$[$i$$]);
    if(0 < $compareResult$$ || 0 == $compareResult$$ && $opt_strict$$) {
      return!1
    }
  }
  return!0
};
goog.array.equals = function $goog$array$equals$($arr1$$, $arr2$$, $equalsFn_opt_equalsFn$$) {
  if(!goog.isArrayLike($arr1$$) || !goog.isArrayLike($arr2$$) || $arr1$$.length != $arr2$$.length) {
    return!1
  }
  for(var $l$$ = $arr1$$.length, $equalsFn_opt_equalsFn$$ = $equalsFn_opt_equalsFn$$ || goog.array.defaultCompareEquality, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$equalsFn_opt_equalsFn$$($arr1$$[$i$$], $arr2$$[$i$$])) {
      return!1
    }
  }
  return!0
};
goog.array.compare = function $goog$array$compare$($arr1$$, $arr2$$, $opt_equalsFn$$) {
  return goog.array.equals($arr1$$, $arr2$$, $opt_equalsFn$$)
};
goog.array.compare3 = function $goog$array$compare3$($arr1$$, $arr2$$, $compare$$2_opt_compareFn$$) {
  for(var $compare$$2_opt_compareFn$$ = $compare$$2_opt_compareFn$$ || goog.array.defaultCompare, $l$$ = Math.min($arr1$$.length, $arr2$$.length), $i$$ = 0;$i$$ < $l$$;$i$$++) {
    var $result$$ = $compare$$2_opt_compareFn$$($arr1$$[$i$$], $arr2$$[$i$$]);
    if(0 != $result$$) {
      return $result$$
    }
  }
  return goog.array.defaultCompare($arr1$$.length, $arr2$$.length)
};
goog.array.defaultCompare = function $goog$array$defaultCompare$($a$$, $b$$) {
  return $a$$ > $b$$ ? 1 : $a$$ < $b$$ ? -1 : 0
};
goog.array.defaultCompareEquality = function $goog$array$defaultCompareEquality$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.array.binaryInsert = function $goog$array$binaryInsert$($array$$, $value$$, $index$$50_opt_compareFn$$) {
  $index$$50_opt_compareFn$$ = goog.array.binarySearch($array$$, $value$$, $index$$50_opt_compareFn$$);
  return 0 > $index$$50_opt_compareFn$$ ? (goog.array.insertAt($array$$, $value$$, -($index$$50_opt_compareFn$$ + 1)), !0) : !1
};
goog.array.binaryRemove = function $goog$array$binaryRemove$($array$$, $index$$51_value$$, $opt_compareFn$$) {
  $index$$51_value$$ = goog.array.binarySearch($array$$, $index$$51_value$$, $opt_compareFn$$);
  return 0 <= $index$$51_value$$ ? goog.array.removeAt($array$$, $index$$51_value$$) : !1
};
goog.array.bucket = function $goog$array$bucket$($array$$, $sorter$$) {
  for(var $buckets$$ = {}, $i$$ = 0;$i$$ < $array$$.length;$i$$++) {
    var $value$$ = $array$$[$i$$], $key$$ = $sorter$$($value$$, $i$$, $array$$);
    goog.isDef($key$$) && ($buckets$$[$key$$] || ($buckets$$[$key$$] = [])).push($value$$)
  }
  return $buckets$$
};
goog.array.repeat = function $goog$array$repeat$($value$$, $n$$) {
  for(var $array$$ = [], $i$$ = 0;$i$$ < $n$$;$i$$++) {
    $array$$[$i$$] = $value$$
  }
  return $array$$
};
goog.array.flatten = function $goog$array$flatten$($var_args$$) {
  for(var $result$$ = [], $i$$ = 0;$i$$ < arguments.length;$i$$++) {
    var $element$$ = arguments[$i$$];
    goog.isArray($element$$) ? $result$$.push.apply($result$$, goog.array.flatten.apply(null, $element$$)) : $result$$.push($element$$)
  }
  return $result$$
};
goog.array.rotate = function $goog$array$rotate$($array$$, $n$$) {
  goog.asserts.assert(null != $array$$.length);
  $array$$.length && ($n$$ %= $array$$.length, 0 < $n$$ ? goog.array.ARRAY_PROTOTYPE_.unshift.apply($array$$, $array$$.splice(-$n$$, $n$$)) : 0 > $n$$ && goog.array.ARRAY_PROTOTYPE_.push.apply($array$$, $array$$.splice(0, -$n$$)));
  return $array$$
};
goog.array.zip = function $goog$array$zip$($var_args$$) {
  if(!arguments.length) {
    return[]
  }
  for(var $result$$ = [], $i$$ = 0;;$i$$++) {
    for(var $value$$ = [], $j$$ = 0;$j$$ < arguments.length;$j$$++) {
      var $arr$$ = arguments[$j$$];
      if($i$$ >= $arr$$.length) {
        return $result$$
      }
      $value$$.push($arr$$[$i$$])
    }
    $result$$.push($value$$)
  }
};
goog.array.shuffle = function $goog$array$shuffle$($arr$$, $opt_randFn$$) {
  for(var $randFn$$ = $opt_randFn$$ || Math.random, $i$$ = $arr$$.length - 1;0 < $i$$;$i$$--) {
    var $j$$ = Math.floor($randFn$$() * ($i$$ + 1)), $tmp$$ = $arr$$[$i$$];
    $arr$$[$i$$] = $arr$$[$j$$];
    $arr$$[$j$$] = $tmp$$
  }
};
fyre.conv.modules = {};
fyre.conv.modules.main = {bootstrap:!0, init:!0, opts:"articleId siteId el collectionMeta checksum authDelegate betaBanner".split(" ")};
fyre.conv.modules.DEFAULT = "main";
goog.uri = {};
goog.uri.utils = {};
goog.uri.utils.CharCode_ = {AMPERSAND:38, EQUAL:61, HASH:35, QUESTION:63};
goog.uri.utils.buildFromEncodedParts = function $goog$uri$utils$buildFromEncodedParts$($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_queryData$$, $opt_fragment$$) {
  var $out$$ = [];
  $opt_scheme$$ && $out$$.push($opt_scheme$$, ":");
  $opt_domain$$ && ($out$$.push("//"), $opt_userInfo$$ && $out$$.push($opt_userInfo$$, "@"), $out$$.push($opt_domain$$), $opt_port$$ && $out$$.push(":", $opt_port$$));
  $opt_path$$ && $out$$.push($opt_path$$);
  $opt_queryData$$ && $out$$.push("?", $opt_queryData$$);
  $opt_fragment$$ && $out$$.push("#", $opt_fragment$$);
  return $out$$.join("")
};
goog.uri.utils.splitRe_ = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
goog.uri.utils.ComponentIndex = {SCHEME:1, USER_INFO:2, DOMAIN:3, PORT:4, PATH:5, QUERY_DATA:6, FRAGMENT:7};
goog.uri.utils.split = function $goog$uri$utils$split$($uri$$) {
  return $uri$$.match(goog.uri.utils.splitRe_)
};
goog.uri.utils.decodeIfPossible_ = function $goog$uri$utils$decodeIfPossible_$($uri$$) {
  return $uri$$ && decodeURIComponent($uri$$)
};
goog.uri.utils.getComponentByIndex_ = function $goog$uri$utils$getComponentByIndex_$($componentIndex$$, $uri$$) {
  return goog.uri.utils.split($uri$$)[$componentIndex$$] || null
};
goog.uri.utils.getScheme = function $goog$uri$utils$getScheme$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.SCHEME, $uri$$)
};
goog.uri.utils.getUserInfoEncoded = function $goog$uri$utils$getUserInfoEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.USER_INFO, $uri$$)
};
goog.uri.utils.getUserInfo = function $goog$uri$utils$getUserInfo$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getUserInfoEncoded($uri$$))
};
goog.uri.utils.getDomainEncoded = function $goog$uri$utils$getDomainEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.DOMAIN, $uri$$)
};
goog.uri.utils.getDomain = function $goog$uri$utils$getDomain$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getDomainEncoded($uri$$))
};
goog.uri.utils.getPort = function $goog$uri$utils$getPort$($uri$$) {
  return Number(goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PORT, $uri$$)) || null
};
goog.uri.utils.getPathEncoded = function $goog$uri$utils$getPathEncoded$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.PATH, $uri$$)
};
goog.uri.utils.getPath = function $goog$uri$utils$getPath$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getPathEncoded($uri$$))
};
goog.uri.utils.getQueryData = function $goog$uri$utils$getQueryData$($uri$$) {
  return goog.uri.utils.getComponentByIndex_(goog.uri.utils.ComponentIndex.QUERY_DATA, $uri$$)
};
goog.uri.utils.getFragmentEncoded = function $goog$uri$utils$getFragmentEncoded$($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? null : $uri$$.substr($hashIndex$$ + 1)
};
goog.uri.utils.setFragmentEncoded = function $goog$uri$utils$setFragmentEncoded$($uri$$, $fragment$$) {
  return goog.uri.utils.removeFragment($uri$$) + ($fragment$$ ? "#" + $fragment$$ : "")
};
goog.uri.utils.getFragment = function $goog$uri$utils$getFragment$($uri$$) {
  return goog.uri.utils.decodeIfPossible_(goog.uri.utils.getFragmentEncoded($uri$$))
};
goog.uri.utils.getHost = function $goog$uri$utils$getHost$($pieces_uri$$) {
  $pieces_uri$$ = goog.uri.utils.split($pieces_uri$$);
  return goog.uri.utils.buildFromEncodedParts($pieces_uri$$[goog.uri.utils.ComponentIndex.SCHEME], $pieces_uri$$[goog.uri.utils.ComponentIndex.USER_INFO], $pieces_uri$$[goog.uri.utils.ComponentIndex.DOMAIN], $pieces_uri$$[goog.uri.utils.ComponentIndex.PORT])
};
goog.uri.utils.getPathAndAfter = function $goog$uri$utils$getPathAndAfter$($pieces$$1_uri$$) {
  $pieces$$1_uri$$ = goog.uri.utils.split($pieces$$1_uri$$);
  return goog.uri.utils.buildFromEncodedParts(null, null, null, null, $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.PATH], $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.QUERY_DATA], $pieces$$1_uri$$[goog.uri.utils.ComponentIndex.FRAGMENT])
};
goog.uri.utils.removeFragment = function $goog$uri$utils$removeFragment$($uri$$) {
  var $hashIndex$$ = $uri$$.indexOf("#");
  return 0 > $hashIndex$$ ? $uri$$ : $uri$$.substr(0, $hashIndex$$)
};
goog.uri.utils.haveSameDomain = function $goog$uri$utils$haveSameDomain$($uri1$$, $uri2$$) {
  var $pieces1$$ = goog.uri.utils.split($uri1$$), $pieces2$$ = goog.uri.utils.split($uri2$$);
  return $pieces1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1$$[goog.uri.utils.ComponentIndex.SCHEME] == $pieces2$$[goog.uri.utils.ComponentIndex.SCHEME] && $pieces1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2$$[goog.uri.utils.ComponentIndex.PORT]
};
goog.uri.utils.assertNoFragmentsOrQueries_ = function $goog$uri$utils$assertNoFragmentsOrQueries_$($uri$$) {
  if(goog.DEBUG && (0 <= $uri$$.indexOf("#") || 0 <= $uri$$.indexOf("?"))) {
    throw Error("goog.uri.utils: Fragment or query identifiers are not supported: [" + $uri$$ + "]");
  }
};
goog.uri.utils.appendQueryData_ = function $goog$uri$utils$appendQueryData_$($buffer$$) {
  if($buffer$$[1]) {
    var $baseUri$$ = $buffer$$[0], $hashIndex$$ = $baseUri$$.indexOf("#");
    0 <= $hashIndex$$ && ($buffer$$.push($baseUri$$.substr($hashIndex$$)), $buffer$$[0] = $baseUri$$ = $baseUri$$.substr(0, $hashIndex$$));
    $hashIndex$$ = $baseUri$$.indexOf("?");
    0 > $hashIndex$$ ? $buffer$$[1] = "?" : $hashIndex$$ == $baseUri$$.length - 1 && ($buffer$$[1] = void 0)
  }
  return $buffer$$.join("")
};
goog.uri.utils.appendKeyValuePairs_ = function $goog$uri$utils$appendKeyValuePairs_$($key$$, $value$$, $pairs$$) {
  if(goog.isArray($value$$)) {
    for(var $j$$ = 0;$j$$ < $value$$.length;$j$$++) {
      $pairs$$.push("&", $key$$), "" !== $value$$[$j$$] && $pairs$$.push("=", goog.string.urlEncode($value$$[$j$$]))
    }
  }else {
    null != $value$$ && ($pairs$$.push("&", $key$$), "" !== $value$$ && $pairs$$.push("=", goog.string.urlEncode($value$$)))
  }
};
goog.uri.utils.buildQueryDataBuffer_ = function $goog$uri$utils$buildQueryDataBuffer_$($buffer$$, $keysAndValues$$, $i$$) {
  goog.asserts.assert(0 == Math.max($keysAndValues$$.length - ($i$$ || 0), 0) % 2, "goog.uri.utils: Key/value lists must be even in length.");
  for($i$$ = $i$$ || 0;$i$$ < $keysAndValues$$.length;$i$$ += 2) {
    goog.uri.utils.appendKeyValuePairs_($keysAndValues$$[$i$$], $keysAndValues$$[$i$$ + 1], $buffer$$)
  }
  return $buffer$$
};
goog.uri.utils.buildQueryData = function $goog$uri$utils$buildQueryData$($keysAndValues$$, $opt_startIndex$$) {
  var $buffer$$ = goog.uri.utils.buildQueryDataBuffer_([], $keysAndValues$$, $opt_startIndex$$);
  $buffer$$[0] = "";
  return $buffer$$.join("")
};
goog.uri.utils.buildQueryDataBufferFromMap_ = function $goog$uri$utils$buildQueryDataBufferFromMap_$($buffer$$, $map$$) {
  for(var $key$$ in $map$$) {
    goog.uri.utils.appendKeyValuePairs_($key$$, $map$$[$key$$], $buffer$$)
  }
  return $buffer$$
};
goog.uri.utils.buildQueryDataFromMap = function $goog$uri$utils$buildQueryDataFromMap$($buffer$$12_map$$) {
  $buffer$$12_map$$ = goog.uri.utils.buildQueryDataBufferFromMap_([], $buffer$$12_map$$);
  $buffer$$12_map$$[0] = "";
  return $buffer$$12_map$$.join("")
};
goog.uri.utils.appendParams = function $goog$uri$utils$appendParams$($uri$$, $var_args$$) {
  return goog.uri.utils.appendQueryData_(2 == arguments.length ? goog.uri.utils.buildQueryDataBuffer_([$uri$$], arguments[1], 0) : goog.uri.utils.buildQueryDataBuffer_([$uri$$], arguments, 1))
};
goog.uri.utils.appendParamsFromMap = function $goog$uri$utils$appendParamsFromMap$($uri$$, $map$$) {
  return goog.uri.utils.appendQueryData_(goog.uri.utils.buildQueryDataBufferFromMap_([$uri$$], $map$$))
};
goog.uri.utils.appendParam = function $goog$uri$utils$appendParam$($uri$$, $key$$, $value$$) {
  return goog.uri.utils.appendQueryData_([$uri$$, "&", $key$$, "=", goog.string.urlEncode($value$$)])
};
goog.uri.utils.findParam_ = function $goog$uri$utils$findParam_$($uri$$, $index$$, $keyEncoded$$, $hashOrEndIndex$$) {
  for(var $keyLength$$ = $keyEncoded$$.length;0 <= ($index$$ = $uri$$.indexOf($keyEncoded$$, $index$$)) && $index$$ < $hashOrEndIndex$$;) {
    var $followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$ - 1);
    if($followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.QUESTION) {
      if($followingChar_precedingChar$$ = $uri$$.charCodeAt($index$$ + $keyLength$$), !$followingChar_precedingChar$$ || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.EQUAL || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.AMPERSAND || $followingChar_precedingChar$$ == goog.uri.utils.CharCode_.HASH) {
        return $index$$
      }
    }
    $index$$ += $keyLength$$ + 1
  }
  return-1
};
goog.uri.utils.hashOrEndRe_ = /#|$/;
goog.uri.utils.hasParam = function $goog$uri$utils$hasParam$($uri$$, $keyEncoded$$) {
  return 0 <= goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $uri$$.search(goog.uri.utils.hashOrEndRe_))
};
goog.uri.utils.getParamValue = function $goog$uri$utils$getParamValue$($uri$$, $keyEncoded$$) {
  var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $foundIndex$$ = goog.uri.utils.findParam_($uri$$, 0, $keyEncoded$$, $hashOrEndIndex$$);
  if(0 > $foundIndex$$) {
    return null
  }
  var $endPosition$$ = $uri$$.indexOf("&", $foundIndex$$);
  if(0 > $endPosition$$ || $endPosition$$ > $hashOrEndIndex$$) {
    $endPosition$$ = $hashOrEndIndex$$
  }
  $foundIndex$$ += $keyEncoded$$.length + 1;
  return goog.string.urlDecode($uri$$.substr($foundIndex$$, $endPosition$$ - $foundIndex$$))
};
goog.uri.utils.getParamValues = function $goog$uri$utils$getParamValues$($uri$$, $keyEncoded$$) {
  for(var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $result$$ = [];0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $position$$ = $uri$$.indexOf("&", $foundIndex$$);
    if(0 > $position$$ || $position$$ > $hashOrEndIndex$$) {
      $position$$ = $hashOrEndIndex$$
    }
    $foundIndex$$ += $keyEncoded$$.length + 1;
    $result$$.push(goog.string.urlDecode($uri$$.substr($foundIndex$$, $position$$ - $foundIndex$$)))
  }
  return $result$$
};
goog.uri.utils.trailingQueryPunctuationRe_ = /[?&]($|#)/;
goog.uri.utils.removeParam = function $goog$uri$utils$removeParam$($uri$$, $keyEncoded$$) {
  for(var $hashOrEndIndex$$ = $uri$$.search(goog.uri.utils.hashOrEndRe_), $position$$ = 0, $foundIndex$$, $buffer$$ = [];0 <= ($foundIndex$$ = goog.uri.utils.findParam_($uri$$, $position$$, $keyEncoded$$, $hashOrEndIndex$$));) {
    $buffer$$.push($uri$$.substring($position$$, $foundIndex$$)), $position$$ = Math.min($uri$$.indexOf("&", $foundIndex$$) + 1 || $hashOrEndIndex$$, $hashOrEndIndex$$)
  }
  $buffer$$.push($uri$$.substr($position$$));
  return $buffer$$.join("").replace(goog.uri.utils.trailingQueryPunctuationRe_, "$1")
};
goog.uri.utils.setParam = function $goog$uri$utils$setParam$($uri$$, $keyEncoded$$, $value$$) {
  return goog.uri.utils.appendParam(goog.uri.utils.removeParam($uri$$, $keyEncoded$$), $keyEncoded$$, $value$$)
};
goog.uri.utils.appendPath = function $goog$uri$utils$appendPath$($baseUri$$, $path$$) {
  goog.uri.utils.assertNoFragmentsOrQueries_($baseUri$$);
  goog.string.endsWith($baseUri$$, "/") && ($baseUri$$ = $baseUri$$.substr(0, $baseUri$$.length - 1));
  goog.string.startsWith($path$$, "/") && ($path$$ = $path$$.substr(1));
  return goog.string.buildString($baseUri$$, "/", $path$$)
};
goog.uri.utils.StandardQueryParam = {RANDOM:"zx"};
goog.uri.utils.makeUnique = function $goog$uri$utils$makeUnique$($uri$$) {
  return goog.uri.utils.setParam($uri$$, goog.uri.utils.StandardQueryParam.RANDOM, goog.string.getRandomString())
};
goog.iter = {};
goog.iter.StopIteration = "StopIteration" in goog.global ? goog.global.StopIteration : Error("StopIteration");
goog.iter.Iterator = function $goog$iter$Iterator$() {
};
goog.iter.Iterator.prototype.next = function $goog$iter$Iterator$$next$() {
  throw goog.iter.StopIteration;
};
goog.iter.Iterator.prototype.__iterator__ = function $goog$iter$Iterator$$__iterator__$() {
  return this
};
goog.iter.toIterator = function $goog$iter$toIterator$($iterable$$) {
  if($iterable$$ instanceof goog.iter.Iterator) {
    return $iterable$$
  }
  if("function" == typeof $iterable$$.__iterator__) {
    return $iterable$$.__iterator__(!1)
  }
  if(goog.isArrayLike($iterable$$)) {
    var $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
    $newIter$$.next = function $$newIter$$$next$() {
      for(;;) {
        if($i$$ >= $iterable$$.length) {
          throw goog.iter.StopIteration;
        }
        if($i$$ in $iterable$$) {
          return $iterable$$[$i$$++]
        }
        $i$$++
      }
    };
    return $newIter$$
  }
  throw Error("Not implemented");
};
goog.iter.forEach = function $goog$iter$forEach$($iterable$$, $f$$, $opt_obj$$) {
  if(goog.isArrayLike($iterable$$)) {
    try {
      goog.array.forEach($iterable$$, $f$$, $opt_obj$$)
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration) {
        throw $ex$$;
      }
    }
  }else {
    $iterable$$ = goog.iter.toIterator($iterable$$);
    try {
      for(;;) {
        $f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)
      }
    }catch($ex$$0$$) {
      if($ex$$0$$ !== goog.iter.StopIteration) {
        throw $ex$$0$$;
      }
    }
  }
};
goog.iter.filter = function $goog$iter$filter$($iterable$$, $f$$, $opt_obj$$) {
  var $iterable$$ = goog.iter.toIterator($iterable$$), $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterable$$.next();
      if($f$$.call($opt_obj$$, $val$$, void 0, $iterable$$)) {
        return $val$$
      }
    }
  };
  return $newIter$$
};
goog.iter.range = function $goog$iter$range$($startOrStop$$, $opt_stop$$, $opt_step$$) {
  var $start$$ = 0, $stop$$ = $startOrStop$$, $step$$ = $opt_step$$ || 1;
  1 < arguments.length && ($start$$ = $startOrStop$$, $stop$$ = $opt_stop$$);
  if(0 == $step$$) {
    throw Error("Range step argument must not be zero");
  }
  var $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    if($step$$ > 0 && $start$$ >= $stop$$ || $step$$ < 0 && $start$$ <= $stop$$) {
      throw goog.iter.StopIteration;
    }
    var $rv$$ = $start$$;
    $start$$ = $start$$ + $step$$;
    return $rv$$
  };
  return $newIter$$
};
goog.iter.join = function $goog$iter$join$($iterable$$, $deliminator$$) {
  return goog.iter.toArray($iterable$$).join($deliminator$$)
};
goog.iter.map = function $goog$iter$map$($iterable$$, $f$$, $opt_obj$$) {
  var $iterable$$ = goog.iter.toIterator($iterable$$), $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterable$$.next();
      return $f$$.call($opt_obj$$, $val$$, void 0, $iterable$$)
    }
  };
  return $newIter$$
};
goog.iter.reduce = function $goog$iter$reduce$($iterable$$, $f$$, $val$$0$$, $opt_obj$$) {
  var $rval$$ = $val$$0$$;
  goog.iter.forEach($iterable$$, function($val$$) {
    $rval$$ = $f$$.call($opt_obj$$, $rval$$, $val$$)
  });
  return $rval$$
};
goog.iter.some = function $goog$iter$some$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if($f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!0
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!1
};
goog.iter.every = function $goog$iter$every$($iterable$$, $f$$, $opt_obj$$) {
  $iterable$$ = goog.iter.toIterator($iterable$$);
  try {
    for(;;) {
      if(!$f$$.call($opt_obj$$, $iterable$$.next(), void 0, $iterable$$)) {
        return!1
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
  }
  return!0
};
goog.iter.chain = function $goog$iter$chain$($var_args$$) {
  var $args$$ = arguments, $length$$ = $args$$.length, $i$$ = 0, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    try {
      if($i$$ >= $length$$) {
        throw goog.iter.StopIteration;
      }
      return goog.iter.toIterator($args$$[$i$$]).next()
    }catch($ex$$) {
      if($ex$$ !== goog.iter.StopIteration || $i$$ >= $length$$) {
        throw $ex$$;
      }
      $i$$++;
      return this.next()
    }
  };
  return $newIter$$
};
goog.iter.dropWhile = function $goog$iter$dropWhile$($iterable$$, $f$$, $opt_obj$$) {
  var $iterable$$ = goog.iter.toIterator($iterable$$), $newIter$$ = new goog.iter.Iterator, $dropping$$ = !0;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      var $val$$ = $iterable$$.next();
      if(!$dropping$$ || !$f$$.call($opt_obj$$, $val$$, void 0, $iterable$$)) {
        return $dropping$$ = !1, $val$$
      }
    }
  };
  return $newIter$$
};
goog.iter.takeWhile = function $goog$iter$takeWhile$($iterable$$, $f$$, $opt_obj$$) {
  var $iterable$$ = goog.iter.toIterator($iterable$$), $newIter$$ = new goog.iter.Iterator, $taking$$ = !0;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      if($taking$$) {
        var $val$$ = $iterable$$.next();
        if($f$$.call($opt_obj$$, $val$$, void 0, $iterable$$)) {
          return $val$$
        }
        $taking$$ = !1
      }else {
        throw goog.iter.StopIteration;
      }
    }
  };
  return $newIter$$
};
goog.iter.toArray = function $goog$iter$toArray$($iterable$$) {
  if(goog.isArrayLike($iterable$$)) {
    return goog.array.toArray($iterable$$)
  }
  var $iterable$$ = goog.iter.toIterator($iterable$$), $array$$ = [];
  goog.iter.forEach($iterable$$, function($val$$) {
    $array$$.push($val$$)
  });
  return $array$$
};
goog.iter.equals = function $goog$iter$equals$($iterable1$$, $iterable2$$) {
  var $iterable1$$ = goog.iter.toIterator($iterable1$$), $iterable2$$ = goog.iter.toIterator($iterable2$$), $b1$$, $b2$$;
  try {
    for(;;) {
      $b1$$ = $b2$$ = !1;
      var $val1$$ = $iterable1$$.next();
      $b1$$ = !0;
      var $val2$$ = $iterable2$$.next();
      $b2$$ = !0;
      if($val1$$ != $val2$$) {
        break
      }
    }
  }catch($ex$$) {
    if($ex$$ !== goog.iter.StopIteration) {
      throw $ex$$;
    }
    if($b1$$ && !$b2$$) {
      return!1
    }
    if(!$b2$$) {
      try {
        $iterable2$$.next()
      }catch($ex1$$) {
        if($ex1$$ !== goog.iter.StopIteration) {
          throw $ex1$$;
        }
        return!0
      }
    }
  }
  return!1
};
goog.iter.nextOrValue = function $goog$iter$nextOrValue$($iterable$$, $defaultValue$$) {
  try {
    return goog.iter.toIterator($iterable$$).next()
  }catch($e$$) {
    if($e$$ != goog.iter.StopIteration) {
      throw $e$$;
    }
    return $defaultValue$$
  }
};
goog.iter.product = function $goog$iter$product$($var_args$$) {
  if(goog.array.some(arguments, function($arr$$) {
    return!$arr$$.length
  }) || !arguments.length) {
    return new goog.iter.Iterator
  }
  var $iter$$ = new goog.iter.Iterator, $arrays$$ = arguments, $indicies$$ = goog.array.repeat(0, $arrays$$.length);
  $iter$$.next = function $$iter$$$next$() {
    if($indicies$$) {
      for(var $retVal$$ = goog.array.map($indicies$$, function($valueIndex$$, $arrayIndex$$) {
        return $arrays$$[$arrayIndex$$][$valueIndex$$]
      }), $i$$ = $indicies$$.length - 1;0 <= $i$$;$i$$--) {
        goog.asserts.assert($indicies$$);
        if($indicies$$[$i$$] < $arrays$$[$i$$].length - 1) {
          $indicies$$[$i$$]++;
          break
        }
        if(0 == $i$$) {
          $indicies$$ = null;
          break
        }
        $indicies$$[$i$$] = 0
      }
      return $retVal$$
    }
    throw goog.iter.StopIteration;
  };
  return $iter$$
};
goog.iter.cycle = function $goog$iter$cycle$($iter$$1_iterable$$) {
  var $baseIterator$$ = goog.iter.toIterator($iter$$1_iterable$$), $cache$$ = [], $cacheIndex$$ = 0, $iter$$1_iterable$$ = new goog.iter.Iterator, $useCache$$ = !1;
  $iter$$1_iterable$$.next = function $$iter$$1_iterable$$$next$() {
    var $returnElement$$ = null;
    if(!$useCache$$) {
      try {
        return $returnElement$$ = $baseIterator$$.next(), $cache$$.push($returnElement$$), $returnElement$$
      }catch($e$$) {
        if($e$$ != goog.iter.StopIteration || goog.array.isEmpty($cache$$)) {
          throw $e$$;
        }
        $useCache$$ = !0
      }
    }
    $returnElement$$ = $cache$$[$cacheIndex$$];
    $cacheIndex$$ = ($cacheIndex$$ + 1) % $cache$$.length;
    return $returnElement$$
  };
  return $iter$$1_iterable$$
};
goog.structs = {};
goog.structs.getCount = function $goog$structs$getCount$($col$$) {
  return"function" == typeof $col$$.getCount ? $col$$.getCount() : goog.isArrayLike($col$$) || goog.isString($col$$) ? $col$$.length : goog.object.getCount($col$$)
};
goog.structs.getValues = function $goog$structs$getValues$($col$$) {
  if("function" == typeof $col$$.getValues) {
    return $col$$.getValues()
  }
  if(goog.isString($col$$)) {
    return $col$$.split("")
  }
  if(goog.isArrayLike($col$$)) {
    for(var $rv$$ = [], $l$$ = $col$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$.push($col$$[$i$$])
    }
    return $rv$$
  }
  return goog.object.getValues($col$$)
};
goog.structs.getKeys = function $goog$structs$getKeys$($col$$2_l$$) {
  if("function" == typeof $col$$2_l$$.getKeys) {
    return $col$$2_l$$.getKeys()
  }
  if("function" != typeof $col$$2_l$$.getValues) {
    if(goog.isArrayLike($col$$2_l$$) || goog.isString($col$$2_l$$)) {
      for(var $rv$$ = [], $col$$2_l$$ = $col$$2_l$$.length, $i$$ = 0;$i$$ < $col$$2_l$$;$i$$++) {
        $rv$$.push($i$$)
      }
      return $rv$$
    }
    return goog.object.getKeys($col$$2_l$$)
  }
};
goog.structs.contains = function $goog$structs$contains$($col$$, $val$$) {
  return"function" == typeof $col$$.contains ? $col$$.contains($val$$) : "function" == typeof $col$$.containsValue ? $col$$.containsValue($val$$) : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.contains($col$$, $val$$) : goog.object.containsValue($col$$, $val$$)
};
goog.structs.isEmpty = function $goog$structs$isEmpty$($col$$) {
  return"function" == typeof $col$$.isEmpty ? $col$$.isEmpty() : goog.isArrayLike($col$$) || goog.isString($col$$) ? goog.array.isEmpty($col$$) : goog.object.isEmpty($col$$)
};
goog.structs.clear = function $goog$structs$clear$($col$$) {
  "function" == typeof $col$$.clear ? $col$$.clear() : goog.isArrayLike($col$$) ? goog.array.clear($col$$) : goog.object.clear($col$$)
};
goog.structs.forEach = function $goog$structs$forEach$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.forEach) {
    $col$$.forEach($f$$, $opt_obj$$)
  }else {
    if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
      goog.array.forEach($col$$, $f$$, $opt_obj$$)
    }else {
      for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
        $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)
      }
    }
  }
};
goog.structs.filter = function $goog$structs$filter$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.filter) {
    return $col$$.filter($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.filter($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$) && ($rv$$[$keys$$[$i$$]] = $values$$[$i$$])
    }
  }else {
    $rv$$ = [];
    for($i$$ = 0;$i$$ < $l$$;$i$$++) {
      $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$) && $rv$$.push($values$$[$i$$])
    }
  }
  return $rv$$
};
goog.structs.map = function $goog$structs$map$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.map) {
    return $col$$.map($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.map($col$$, $f$$, $opt_obj$$)
  }
  var $rv$$, $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length;
  if($keys$$) {
    $rv$$ = {};
    for(var $i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$keys$$[$i$$]] = $f$$.call($opt_obj$$, $values$$[$i$$], $keys$$[$i$$], $col$$)
    }
  }else {
    $rv$$ = [];
    for($i$$ = 0;$i$$ < $l$$;$i$$++) {
      $rv$$[$i$$] = $f$$.call($opt_obj$$, $values$$[$i$$], void 0, $col$$)
    }
  }
  return $rv$$
};
goog.structs.some = function $goog$structs$some$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.some) {
    return $col$$.some($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.some($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if($f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!0
    }
  }
  return!1
};
goog.structs.every = function $goog$structs$every$($col$$, $f$$, $opt_obj$$) {
  if("function" == typeof $col$$.every) {
    return $col$$.every($f$$, $opt_obj$$)
  }
  if(goog.isArrayLike($col$$) || goog.isString($col$$)) {
    return goog.array.every($col$$, $f$$, $opt_obj$$)
  }
  for(var $keys$$ = goog.structs.getKeys($col$$), $values$$ = goog.structs.getValues($col$$), $l$$ = $values$$.length, $i$$ = 0;$i$$ < $l$$;$i$$++) {
    if(!$f$$.call($opt_obj$$, $values$$[$i$$], $keys$$ && $keys$$[$i$$], $col$$)) {
      return!1
    }
  }
  return!0
};
goog.structs.Map = function $goog$structs$Map$($opt_map$$, $var_args$$) {
  this.map_ = {};
  this.keys_ = [];
  var $argLength$$ = arguments.length;
  if(1 < $argLength$$) {
    if($argLength$$ % 2) {
      throw Error("Uneven number of arguments");
    }
    for(var $i$$ = 0;$i$$ < $argLength$$;$i$$ += 2) {
      this.set(arguments[$i$$], arguments[$i$$ + 1])
    }
  }else {
    $opt_map$$ && this.addAll($opt_map$$)
  }
};
goog.structs.Map.prototype.count_ = 0;
goog.structs.Map.prototype.version_ = 0;
goog.structs.Map.prototype.getCount = function $goog$structs$Map$$getCount$() {
  return this.count_
};
goog.structs.Map.prototype.getValues = function $goog$structs$Map$$getValues$() {
  this.cleanupKeysArray_();
  for(var $rv$$ = [], $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    $rv$$.push(this.map_[this.keys_[$i$$]])
  }
  return $rv$$
};
goog.structs.Map.prototype.getKeys = function $goog$structs$Map$$getKeys$() {
  this.cleanupKeysArray_();
  return this.keys_.concat()
};
goog.structs.Map.prototype.containsKey = function $goog$structs$Map$$containsKey$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$)
};
goog.structs.Map.prototype.containsValue = function $goog$structs$Map$$containsValue$($val$$) {
  for(var $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    if(goog.structs.Map.hasKey_(this.map_, $key$$) && this.map_[$key$$] == $val$$) {
      return!0
    }
  }
  return!1
};
goog.structs.Map.prototype.equals = function $goog$structs$Map$$equals$($otherMap$$, $opt_equalityFn$$) {
  if(this === $otherMap$$) {
    return!0
  }
  if(this.count_ != $otherMap$$.getCount()) {
    return!1
  }
  var $equalityFn$$ = $opt_equalityFn$$ || goog.structs.Map.defaultEquals;
  this.cleanupKeysArray_();
  for(var $key$$, $i$$ = 0;$key$$ = this.keys_[$i$$];$i$$++) {
    if(!$equalityFn$$(this.get($key$$), $otherMap$$.get($key$$))) {
      return!1
    }
  }
  return!0
};
goog.structs.Map.defaultEquals = function $goog$structs$Map$defaultEquals$($a$$, $b$$) {
  return $a$$ === $b$$
};
goog.structs.Map.prototype.isEmpty = function $goog$structs$Map$$isEmpty$() {
  return 0 == this.count_
};
goog.structs.Map.prototype.clear = function $goog$structs$Map$$clear$() {
  this.map_ = {};
  this.version_ = this.count_ = this.keys_.length = 0
};
goog.structs.Map.prototype.remove = function $goog$structs$Map$$remove$($key$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? (delete this.map_[$key$$], this.count_--, this.version_++, this.keys_.length > 2 * this.count_ && this.cleanupKeysArray_(), !0) : !1
};
goog.structs.Map.prototype.cleanupKeysArray_ = function $goog$structs$Map$$cleanupKeysArray_$() {
  if(this.count_ != this.keys_.length) {
    for(var $srcIndex$$ = 0, $destIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      var $key$$ = this.keys_[$srcIndex$$];
      goog.structs.Map.hasKey_(this.map_, $key$$) && (this.keys_[$destIndex$$++] = $key$$);
      $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
  if(this.count_ != this.keys_.length) {
    for(var $seen$$ = {}, $destIndex$$ = $srcIndex$$ = 0;$srcIndex$$ < this.keys_.length;) {
      $key$$ = this.keys_[$srcIndex$$], goog.structs.Map.hasKey_($seen$$, $key$$) || (this.keys_[$destIndex$$++] = $key$$, $seen$$[$key$$] = 1), $srcIndex$$++
    }
    this.keys_.length = $destIndex$$
  }
};
goog.structs.Map.prototype.get = function $goog$structs$Map$$get$($key$$, $opt_val$$) {
  return goog.structs.Map.hasKey_(this.map_, $key$$) ? this.map_[$key$$] : $opt_val$$
};
goog.structs.Map.prototype.set = function $goog$structs$Map$$set$($key$$, $value$$) {
  goog.structs.Map.hasKey_(this.map_, $key$$) || (this.count_++, this.keys_.push($key$$), this.version_++);
  this.map_[$key$$] = $value$$
};
goog.structs.Map.prototype.addAll = function $goog$structs$Map$$addAll$($map$$3_values$$) {
  var $keys$$;
  $map$$3_values$$ instanceof goog.structs.Map ? ($keys$$ = $map$$3_values$$.getKeys(), $map$$3_values$$ = $map$$3_values$$.getValues()) : ($keys$$ = goog.object.getKeys($map$$3_values$$), $map$$3_values$$ = goog.object.getValues($map$$3_values$$));
  for(var $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    this.set($keys$$[$i$$], $map$$3_values$$[$i$$])
  }
};
goog.structs.Map.prototype.clone = function $goog$structs$Map$$clone$() {
  return new goog.structs.Map(this)
};
goog.structs.Map.prototype.transpose = function $goog$structs$Map$$transpose$() {
  for(var $transposed$$ = new goog.structs.Map, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $transposed$$.set(this.map_[$key$$], $key$$)
  }
  return $transposed$$
};
goog.structs.Map.prototype.toObject = function $goog$structs$Map$$toObject$() {
  this.cleanupKeysArray_();
  for(var $obj$$ = {}, $i$$ = 0;$i$$ < this.keys_.length;$i$$++) {
    var $key$$ = this.keys_[$i$$];
    $obj$$[$key$$] = this.map_[$key$$]
  }
  return $obj$$
};
goog.structs.Map.prototype.getKeyIterator = function $goog$structs$Map$$getKeyIterator$() {
  return this.__iterator__(!0)
};
goog.structs.Map.prototype.getValueIterator = function $goog$structs$Map$$getValueIterator$() {
  return this.__iterator__(!1)
};
goog.structs.Map.prototype.__iterator__ = function $goog$structs$Map$$__iterator__$($opt_keys$$) {
  this.cleanupKeysArray_();
  var $i$$ = 0, $keys$$ = this.keys_, $map$$ = this.map_, $version$$ = this.version_, $selfObj$$ = this, $newIter$$ = new goog.iter.Iterator;
  $newIter$$.next = function $$newIter$$$next$() {
    for(;;) {
      if($version$$ != $selfObj$$.version_) {
        throw Error("The map has changed since the iterator was created");
      }
      if($i$$ >= $keys$$.length) {
        throw goog.iter.StopIteration;
      }
      var $key$$ = $keys$$[$i$$++];
      return $opt_keys$$ ? $key$$ : $map$$[$key$$]
    }
  };
  return $newIter$$
};
goog.structs.Map.hasKey_ = function $goog$structs$Map$hasKey_$($obj$$, $key$$) {
  return Object.prototype.hasOwnProperty.call($obj$$, $key$$)
};
goog.Uri = function $goog$Uri$($opt_uri$$, $opt_ignoreCase$$) {
  var $m$$;
  $opt_uri$$ instanceof goog.Uri ? (this.setIgnoreCase(null == $opt_ignoreCase$$ ? $opt_uri$$.getIgnoreCase() : $opt_ignoreCase$$), this.setScheme($opt_uri$$.getScheme()), this.setUserInfo($opt_uri$$.getUserInfo()), this.setDomain($opt_uri$$.getDomain()), this.setPort($opt_uri$$.getPort()), this.setPath($opt_uri$$.getPath()), this.setQueryData($opt_uri$$.getQueryData().clone()), this.setFragment($opt_uri$$.getFragment())) : $opt_uri$$ && ($m$$ = goog.uri.utils.split(String($opt_uri$$))) ? (this.setIgnoreCase(!!$opt_ignoreCase$$), 
  this.setScheme($m$$[goog.uri.utils.ComponentIndex.SCHEME] || "", !0), this.setUserInfo($m$$[goog.uri.utils.ComponentIndex.USER_INFO] || "", !0), this.setDomain($m$$[goog.uri.utils.ComponentIndex.DOMAIN] || "", !0), this.setPort($m$$[goog.uri.utils.ComponentIndex.PORT]), this.setPath($m$$[goog.uri.utils.ComponentIndex.PATH] || "", !0), this.setQuery($m$$[goog.uri.utils.ComponentIndex.QUERY_DATA] || "", !0), this.setFragment($m$$[goog.uri.utils.ComponentIndex.FRAGMENT] || "", !0)) : (this.setIgnoreCase(!!$opt_ignoreCase$$), 
  this.queryData_ = new goog.Uri.QueryData(null, this, this.ignoreCase_))
};
goog.Uri.RANDOM_PARAM = goog.uri.utils.StandardQueryParam.RANDOM;
goog.Uri.prototype.scheme_ = "";
goog.Uri.prototype.userInfo_ = "";
goog.Uri.prototype.domain_ = "";
goog.Uri.prototype.port_ = null;
goog.Uri.prototype.path_ = "";
goog.Uri.prototype.fragment_ = "";
goog.Uri.prototype.isReadOnly_ = !1;
goog.Uri.prototype.ignoreCase_ = !1;
goog.Uri.prototype.toString = function $goog$Uri$$toString$() {
  if(this.cachedToString_) {
    return this.cachedToString_
  }
  var $out$$ = [];
  this.scheme_ && $out$$.push(goog.Uri.encodeSpecialChars_(this.scheme_, goog.Uri.reDisallowedInSchemeOrUserInfo_), ":");
  this.domain_ && ($out$$.push("//"), this.userInfo_ && $out$$.push(goog.Uri.encodeSpecialChars_(this.userInfo_, goog.Uri.reDisallowedInSchemeOrUserInfo_), "@"), $out$$.push(goog.Uri.encodeString_(this.domain_)), null != this.port_ && $out$$.push(":", String(this.getPort())));
  this.path_ && (this.hasDomain() && "/" != this.path_.charAt(0) && $out$$.push("/"), $out$$.push(goog.Uri.encodeSpecialChars_(this.path_, "/" == this.path_.charAt(0) ? goog.Uri.reDisallowedInAbsolutePath_ : goog.Uri.reDisallowedInRelativePath_)));
  var $query$$ = String(this.queryData_);
  $query$$ && $out$$.push("?", $query$$);
  this.fragment_ && $out$$.push("#", goog.Uri.encodeSpecialChars_(this.fragment_, goog.Uri.reDisallowedInFragment_));
  return this.cachedToString_ = $out$$.join("")
};
goog.Uri.prototype.resolve = function $goog$Uri$$resolve$($relativeUri$$) {
  var $absoluteUri$$ = this.clone(), $overridden$$ = $relativeUri$$.hasScheme();
  $overridden$$ ? $absoluteUri$$.setScheme($relativeUri$$.getScheme()) : $overridden$$ = $relativeUri$$.hasUserInfo();
  $overridden$$ ? $absoluteUri$$.setUserInfo($relativeUri$$.getUserInfo()) : $overridden$$ = $relativeUri$$.hasDomain();
  $overridden$$ ? $absoluteUri$$.setDomain($relativeUri$$.getDomain()) : $overridden$$ = $relativeUri$$.hasPort();
  var $path$$ = $relativeUri$$.getPath();
  if($overridden$$) {
    $absoluteUri$$.setPort($relativeUri$$.getPort())
  }else {
    if($overridden$$ = $relativeUri$$.hasPath()) {
      if("/" != $path$$.charAt(0)) {
        if(this.hasDomain() && !this.hasPath()) {
          $path$$ = "/" + $path$$
        }else {
          var $lastSlashIndex$$ = $absoluteUri$$.getPath().lastIndexOf("/");
          -1 != $lastSlashIndex$$ && ($path$$ = $absoluteUri$$.getPath().substr(0, $lastSlashIndex$$ + 1) + $path$$)
        }
      }
      $path$$ = goog.Uri.removeDotSegments($path$$)
    }
  }
  $overridden$$ ? $absoluteUri$$.setPath($path$$) : $overridden$$ = $relativeUri$$.hasQuery();
  $overridden$$ ? $absoluteUri$$.setQuery($relativeUri$$.getDecodedQuery()) : $overridden$$ = $relativeUri$$.hasFragment();
  $overridden$$ && $absoluteUri$$.setFragment($relativeUri$$.getFragment());
  return $absoluteUri$$
};
goog.Uri.prototype.clone = function $goog$Uri$$clone$() {
  return goog.Uri.create(this.scheme_, this.userInfo_, this.domain_, this.port_, this.path_, this.queryData_.clone(), this.fragment_, this.ignoreCase_)
};
goog.Uri.prototype.getScheme = function $goog$Uri$$getScheme$() {
  return this.scheme_
};
goog.Uri.prototype.setScheme = function $goog$Uri$$setScheme$($newScheme$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if(this.scheme_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newScheme$$) : $newScheme$$) {
    this.scheme_ = this.scheme_.replace(/:$/, "")
  }
  return this
};
goog.Uri.prototype.hasScheme = function $goog$Uri$$hasScheme$() {
  return!!this.scheme_
};
goog.Uri.prototype.getUserInfo = function $goog$Uri$$getUserInfo$() {
  return this.userInfo_
};
goog.Uri.prototype.setUserInfo = function $goog$Uri$$setUserInfo$($newUserInfo$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.userInfo_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newUserInfo$$) : $newUserInfo$$;
  return this
};
goog.Uri.prototype.hasUserInfo = function $goog$Uri$$hasUserInfo$() {
  return!!this.userInfo_
};
goog.Uri.prototype.getDomain = function $goog$Uri$$getDomain$() {
  return this.domain_
};
goog.Uri.prototype.setDomain = function $goog$Uri$$setDomain$($newDomain$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.domain_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newDomain$$) : $newDomain$$;
  return this
};
goog.Uri.prototype.hasDomain = function $goog$Uri$$hasDomain$() {
  return!!this.domain_
};
goog.Uri.prototype.getPort = function $goog$Uri$$getPort$() {
  return this.port_
};
goog.Uri.prototype.setPort = function $goog$Uri$$setPort$($newPort$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  if($newPort$$) {
    $newPort$$ = Number($newPort$$);
    if(isNaN($newPort$$) || 0 > $newPort$$) {
      throw Error("Bad port number " + $newPort$$);
    }
    this.port_ = $newPort$$
  }else {
    this.port_ = null
  }
  return this
};
goog.Uri.prototype.hasPort = function $goog$Uri$$hasPort$() {
  return null != this.port_
};
goog.Uri.prototype.getPath = function $goog$Uri$$getPath$() {
  return this.path_
};
goog.Uri.prototype.setPath = function $goog$Uri$$setPath$($newPath$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.path_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newPath$$) : $newPath$$;
  return this
};
goog.Uri.prototype.hasPath = function $goog$Uri$$hasPath$() {
  return!!this.path_
};
goog.Uri.prototype.hasQuery = function $goog$Uri$$hasQuery$() {
  return"" !== this.queryData_.toString()
};
goog.Uri.prototype.setQueryData = function $goog$Uri$$setQueryData$($queryData$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  $queryData$$ instanceof goog.Uri.QueryData ? (this.queryData_ = $queryData$$, this.queryData_.uri_ = this, this.queryData_.setIgnoreCase(this.ignoreCase_)) : ($opt_decode$$ || ($queryData$$ = goog.Uri.encodeSpecialChars_($queryData$$, goog.Uri.reDisallowedInQuery_)), this.queryData_ = new goog.Uri.QueryData($queryData$$, this, this.ignoreCase_));
  return this
};
goog.Uri.prototype.setQuery = function $goog$Uri$$setQuery$($newQuery$$, $opt_decode$$) {
  return this.setQueryData($newQuery$$, $opt_decode$$)
};
goog.Uri.prototype.getEncodedQuery = function $goog$Uri$$getEncodedQuery$() {
  return this.queryData_.toString()
};
goog.Uri.prototype.getDecodedQuery = function $goog$Uri$$getDecodedQuery$() {
  return this.queryData_.toDecodedString()
};
goog.Uri.prototype.getQueryData = function $goog$Uri$$getQueryData$() {
  return this.queryData_
};
goog.Uri.prototype.getQuery = function $goog$Uri$$getQuery$() {
  return this.getEncodedQuery()
};
goog.Uri.prototype.setParameterValue = function $goog$Uri$$setParameterValue$($key$$, $value$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.queryData_.set($key$$, $value$$);
  return this
};
goog.Uri.prototype.setParameterValues = function $goog$Uri$$setParameterValues$($key$$, $values$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  goog.isArray($values$$) || ($values$$ = [String($values$$)]);
  this.queryData_.setValues($key$$, $values$$);
  return this
};
goog.Uri.prototype.getParameterValues = function $goog$Uri$$getParameterValues$($name$$) {
  return this.queryData_.getValues($name$$)
};
goog.Uri.prototype.getParameterValue = function $goog$Uri$$getParameterValue$($paramName$$) {
  return this.queryData_.get($paramName$$)
};
goog.Uri.prototype.getFragment = function $goog$Uri$$getFragment$() {
  return this.fragment_
};
goog.Uri.prototype.setFragment = function $goog$Uri$$setFragment$($newFragment$$, $opt_decode$$) {
  this.enforceReadOnly();
  delete this.cachedToString_;
  this.fragment_ = $opt_decode$$ ? goog.Uri.decodeOrEmpty_($newFragment$$) : $newFragment$$;
  return this
};
goog.Uri.prototype.hasFragment = function $goog$Uri$$hasFragment$() {
  return!!this.fragment_
};
goog.Uri.prototype.hasSameDomainAs = function $goog$Uri$$hasSameDomainAs$($uri2$$) {
  return(!this.hasDomain() && !$uri2$$.hasDomain() || this.getDomain() == $uri2$$.getDomain()) && (!this.hasPort() && !$uri2$$.hasPort() || this.getPort() == $uri2$$.getPort())
};
goog.Uri.prototype.makeUnique = function $goog$Uri$$makeUnique$() {
  this.enforceReadOnly();
  this.setParameterValue(goog.Uri.RANDOM_PARAM, goog.string.getRandomString());
  return this
};
goog.Uri.prototype.removeParameter = function $goog$Uri$$removeParameter$($key$$) {
  this.enforceReadOnly();
  this.queryData_.remove($key$$);
  return this
};
goog.Uri.prototype.setReadOnly = function $goog$Uri$$setReadOnly$($isReadOnly$$) {
  this.isReadOnly_ = $isReadOnly$$;
  return this
};
goog.Uri.prototype.isReadOnly = function $goog$Uri$$isReadOnly$() {
  return this.isReadOnly_
};
goog.Uri.prototype.enforceReadOnly = function $goog$Uri$$enforceReadOnly$() {
  if(this.isReadOnly_) {
    throw Error("Tried to modify a read-only Uri");
  }
};
goog.Uri.prototype.setIgnoreCase = function $goog$Uri$$setIgnoreCase$($ignoreCase$$) {
  this.ignoreCase_ = $ignoreCase$$;
  this.queryData_ && this.queryData_.setIgnoreCase($ignoreCase$$);
  return this
};
goog.Uri.prototype.getIgnoreCase = function $goog$Uri$$getIgnoreCase$() {
  return this.ignoreCase_
};
goog.Uri.parse = function $goog$Uri$parse$($uri$$, $opt_ignoreCase$$) {
  return $uri$$ instanceof goog.Uri ? $uri$$.clone() : new goog.Uri($uri$$, $opt_ignoreCase$$)
};
goog.Uri.create = function $goog$Uri$create$($opt_scheme$$, $opt_userInfo$$, $opt_domain$$, $opt_port$$, $opt_path$$, $opt_query$$, $opt_fragment$$, $opt_ignoreCase$$2_uri$$) {
  $opt_ignoreCase$$2_uri$$ = new goog.Uri(null, $opt_ignoreCase$$2_uri$$);
  $opt_scheme$$ && $opt_ignoreCase$$2_uri$$.setScheme($opt_scheme$$);
  $opt_userInfo$$ && $opt_ignoreCase$$2_uri$$.setUserInfo($opt_userInfo$$);
  $opt_domain$$ && $opt_ignoreCase$$2_uri$$.setDomain($opt_domain$$);
  $opt_port$$ && $opt_ignoreCase$$2_uri$$.setPort($opt_port$$);
  $opt_path$$ && $opt_ignoreCase$$2_uri$$.setPath($opt_path$$);
  $opt_query$$ && $opt_ignoreCase$$2_uri$$.setQueryData($opt_query$$);
  $opt_fragment$$ && $opt_ignoreCase$$2_uri$$.setFragment($opt_fragment$$);
  return $opt_ignoreCase$$2_uri$$
};
goog.Uri.resolve = function $goog$Uri$resolve$($base$$, $rel$$) {
  $base$$ instanceof goog.Uri || ($base$$ = goog.Uri.parse($base$$));
  $rel$$ instanceof goog.Uri || ($rel$$ = goog.Uri.parse($rel$$));
  return $base$$.resolve($rel$$)
};
goog.Uri.removeDotSegments = function $goog$Uri$removeDotSegments$($path$$) {
  if(".." == $path$$ || "." == $path$$) {
    return""
  }
  if(!goog.string.contains($path$$, "./") && !goog.string.contains($path$$, "/.")) {
    return $path$$
  }
  for(var $leadingSlash$$ = goog.string.startsWith($path$$, "/"), $path$$ = $path$$.split("/"), $out$$ = [], $pos$$ = 0;$pos$$ < $path$$.length;) {
    var $segment$$ = $path$$[$pos$$++];
    "." == $segment$$ ? $leadingSlash$$ && $pos$$ == $path$$.length && $out$$.push("") : ".." == $segment$$ ? ((1 < $out$$.length || 1 == $out$$.length && "" != $out$$[0]) && $out$$.pop(), $leadingSlash$$ && $pos$$ == $path$$.length && $out$$.push("")) : ($out$$.push($segment$$), $leadingSlash$$ = !0)
  }
  return $out$$.join("/")
};
goog.Uri.decodeOrEmpty_ = function $goog$Uri$decodeOrEmpty_$($val$$) {
  return $val$$ ? decodeURIComponent($val$$) : ""
};
goog.Uri.encodeString_ = function $goog$Uri$encodeString_$($unescapedPart$$) {
  return goog.isString($unescapedPart$$) ? encodeURIComponent($unescapedPart$$) : null
};
goog.Uri.encodeSpecialRegExp_ = /^[a-zA-Z0-9\-_.!~*'():\/;?]*$/;
goog.Uri.encodeSpecialChars_ = function $goog$Uri$encodeSpecialChars_$($unescapedPart$$, $extra$$) {
  var $ret$$ = null;
  goog.isString($unescapedPart$$) && ($ret$$ = $unescapedPart$$, goog.Uri.encodeSpecialRegExp_.test($ret$$) || ($ret$$ = encodeURI($unescapedPart$$)), 0 <= $ret$$.search($extra$$) && ($ret$$ = $ret$$.replace($extra$$, goog.Uri.encodeChar_)));
  return $ret$$
};
goog.Uri.encodeChar_ = function $goog$Uri$encodeChar_$($ch$$3_n$$) {
  $ch$$3_n$$ = $ch$$3_n$$.charCodeAt(0);
  return"%" + ($ch$$3_n$$ >> 4 & 15).toString(16) + ($ch$$3_n$$ & 15).toString(16)
};
goog.Uri.reDisallowedInSchemeOrUserInfo_ = /[#\/\?@]/g;
goog.Uri.reDisallowedInRelativePath_ = /[\#\?:]/g;
goog.Uri.reDisallowedInAbsolutePath_ = /[\#\?]/g;
goog.Uri.reDisallowedInQuery_ = /[\#\?@]/g;
goog.Uri.reDisallowedInFragment_ = /#/g;
goog.Uri.haveSameDomain = function $goog$Uri$haveSameDomain$($uri1String$$, $uri2String$$) {
  var $pieces1$$ = goog.uri.utils.split($uri1String$$), $pieces2$$ = goog.uri.utils.split($uri2String$$);
  return $pieces1$$[goog.uri.utils.ComponentIndex.DOMAIN] == $pieces2$$[goog.uri.utils.ComponentIndex.DOMAIN] && $pieces1$$[goog.uri.utils.ComponentIndex.PORT] == $pieces2$$[goog.uri.utils.ComponentIndex.PORT]
};
goog.Uri.QueryData = function $goog$Uri$QueryData$($opt_query$$, $opt_uri$$, $opt_ignoreCase$$) {
  this.encodedQuery_ = $opt_query$$ || null;
  this.uri_ = $opt_uri$$ || null;
  this.ignoreCase_ = !!$opt_ignoreCase$$
};
goog.Uri.QueryData.prototype.ensureKeyMapInitialized_ = function $goog$Uri$QueryData$$ensureKeyMapInitialized_$() {
  if(!this.keyMap_ && (this.keyMap_ = new goog.structs.Map, this.count_ = 0, this.encodedQuery_)) {
    for(var $pairs$$ = this.encodedQuery_.split("&"), $i$$ = 0;$i$$ < $pairs$$.length;$i$$++) {
      var $indexOfEquals$$ = $pairs$$[$i$$].indexOf("="), $name$$ = null, $value$$ = null;
      0 <= $indexOfEquals$$ ? ($name$$ = $pairs$$[$i$$].substring(0, $indexOfEquals$$), $value$$ = $pairs$$[$i$$].substring($indexOfEquals$$ + 1)) : $name$$ = $pairs$$[$i$$];
      $name$$ = goog.string.urlDecode($name$$);
      $name$$ = this.getKeyName_($name$$);
      this.add($name$$, $value$$ ? goog.string.urlDecode($value$$) : "")
    }
  }
};
goog.Uri.QueryData.createFromMap = function $goog$Uri$QueryData$createFromMap$($map$$, $opt_uri$$, $opt_ignoreCase$$) {
  var $keys$$ = goog.structs.getKeys($map$$);
  if("undefined" == typeof $keys$$) {
    throw Error("Keys are undefined");
  }
  return goog.Uri.QueryData.createFromKeysValues($keys$$, goog.structs.getValues($map$$), $opt_uri$$, $opt_ignoreCase$$)
};
goog.Uri.QueryData.createFromKeysValues = function $goog$Uri$QueryData$createFromKeysValues$($keys$$, $values$$, $opt_uri$$3_queryData$$, $i$$72_opt_ignoreCase$$) {
  if($keys$$.length != $values$$.length) {
    throw Error("Mismatched lengths for keys/values");
  }
  $opt_uri$$3_queryData$$ = new goog.Uri.QueryData(null, $opt_uri$$3_queryData$$, $i$$72_opt_ignoreCase$$);
  for($i$$72_opt_ignoreCase$$ = 0;$i$$72_opt_ignoreCase$$ < $keys$$.length;$i$$72_opt_ignoreCase$$++) {
    $opt_uri$$3_queryData$$.add($keys$$[$i$$72_opt_ignoreCase$$], $values$$[$i$$72_opt_ignoreCase$$])
  }
  return $opt_uri$$3_queryData$$
};
goog.Uri.QueryData.prototype.keyMap_ = null;
goog.Uri.QueryData.prototype.count_ = null;
goog.Uri.QueryData.decodedQuery_ = null;
goog.Uri.QueryData.prototype.getCount = function $goog$Uri$QueryData$$getCount$() {
  this.ensureKeyMapInitialized_();
  return this.count_
};
goog.Uri.QueryData.prototype.add = function $goog$Uri$QueryData$$add$($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  if(this.containsKey($key$$)) {
    var $current$$ = this.keyMap_.get($key$$);
    goog.isArray($current$$) ? $current$$.push($value$$) : this.keyMap_.set($key$$, [$current$$, $value$$])
  }else {
    this.keyMap_.set($key$$, $value$$)
  }
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.remove = function $goog$Uri$QueryData$$remove$($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  if(this.keyMap_.containsKey($key$$)) {
    this.invalidateCache_();
    var $old$$ = this.keyMap_.get($key$$);
    goog.isArray($old$$) ? this.count_ -= $old$$.length : this.count_--;
    return this.keyMap_.remove($key$$)
  }
  return!1
};
goog.Uri.QueryData.prototype.clear = function $goog$Uri$QueryData$$clear$() {
  this.invalidateCache_();
  this.keyMap_ && this.keyMap_.clear();
  this.count_ = 0
};
goog.Uri.QueryData.prototype.isEmpty = function $goog$Uri$QueryData$$isEmpty$() {
  this.ensureKeyMapInitialized_();
  return 0 == this.count_
};
goog.Uri.QueryData.prototype.containsKey = function $goog$Uri$QueryData$$containsKey$($key$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  return this.keyMap_.containsKey($key$$)
};
goog.Uri.QueryData.prototype.containsValue = function $goog$Uri$QueryData$$containsValue$($value$$) {
  var $vals$$ = this.getValues();
  return goog.array.contains($vals$$, $value$$)
};
goog.Uri.QueryData.prototype.getKeys = function $goog$Uri$QueryData$$getKeys$() {
  this.ensureKeyMapInitialized_();
  for(var $vals$$ = this.keyMap_.getValues(), $keys$$ = this.keyMap_.getKeys(), $rv$$ = [], $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    var $val$$ = $vals$$[$i$$];
    if(goog.isArray($val$$)) {
      for(var $j$$ = 0;$j$$ < $val$$.length;$j$$++) {
        $rv$$.push($keys$$[$i$$])
      }
    }else {
      $rv$$.push($keys$$[$i$$])
    }
  }
  return $rv$$
};
goog.Uri.QueryData.prototype.getValues = function $goog$Uri$QueryData$$getValues$($key$$65_opt_key$$1_rv$$) {
  this.ensureKeyMapInitialized_();
  if($key$$65_opt_key$$1_rv$$) {
    if($key$$65_opt_key$$1_rv$$ = this.getKeyName_($key$$65_opt_key$$1_rv$$), this.containsKey($key$$65_opt_key$$1_rv$$)) {
      var $vals$$2_value$$ = this.keyMap_.get($key$$65_opt_key$$1_rv$$);
      if(goog.isArray($vals$$2_value$$)) {
        return $vals$$2_value$$
      }
      $key$$65_opt_key$$1_rv$$ = [];
      $key$$65_opt_key$$1_rv$$.push($vals$$2_value$$)
    }else {
      $key$$65_opt_key$$1_rv$$ = []
    }
  }else {
    for(var $vals$$2_value$$ = this.keyMap_.getValues(), $key$$65_opt_key$$1_rv$$ = [], $i$$ = 0;$i$$ < $vals$$2_value$$.length;$i$$++) {
      var $val$$ = $vals$$2_value$$[$i$$];
      goog.isArray($val$$) ? goog.array.extend($key$$65_opt_key$$1_rv$$, $val$$) : $key$$65_opt_key$$1_rv$$.push($val$$)
    }
  }
  return $key$$65_opt_key$$1_rv$$
};
goog.Uri.QueryData.prototype.set = function $goog$Uri$QueryData$$set$($key$$, $value$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  if(this.containsKey($key$$)) {
    var $old$$ = this.keyMap_.get($key$$);
    goog.isArray($old$$) ? this.count_ -= $old$$.length : this.count_--
  }
  this.keyMap_.set($key$$, $value$$);
  this.count_++;
  return this
};
goog.Uri.QueryData.prototype.get = function $goog$Uri$QueryData$$get$($key$$, $opt_default$$) {
  this.ensureKeyMapInitialized_();
  $key$$ = this.getKeyName_($key$$);
  if(this.containsKey($key$$)) {
    var $val$$ = this.keyMap_.get($key$$);
    return goog.isArray($val$$) ? $val$$[0] : $val$$
  }
  return $opt_default$$
};
goog.Uri.QueryData.prototype.setValues = function $goog$Uri$QueryData$$setValues$($key$$, $values$$) {
  this.ensureKeyMapInitialized_();
  this.invalidateCache_();
  $key$$ = this.getKeyName_($key$$);
  if(this.containsKey($key$$)) {
    var $old$$ = this.keyMap_.get($key$$);
    goog.isArray($old$$) ? this.count_ -= $old$$.length : this.count_--
  }
  0 < $values$$.length && (this.keyMap_.set($key$$, $values$$), this.count_ += $values$$.length)
};
goog.Uri.QueryData.prototype.toString = function $goog$Uri$QueryData$$toString$() {
  if(this.encodedQuery_) {
    return this.encodedQuery_
  }
  if(!this.keyMap_) {
    return""
  }
  for(var $sb$$ = [], $count$$ = 0, $keys$$ = this.keyMap_.getKeys(), $i$$ = 0;$i$$ < $keys$$.length;$i$$++) {
    var $key$$69_val$$ = $keys$$[$i$$], $encodedKey$$ = goog.string.urlEncode($key$$69_val$$), $key$$69_val$$ = this.keyMap_.get($key$$69_val$$);
    if(goog.isArray($key$$69_val$$)) {
      for(var $j$$ = 0;$j$$ < $key$$69_val$$.length;$j$$++) {
        0 < $count$$ && $sb$$.push("&"), $sb$$.push($encodedKey$$), "" !== $key$$69_val$$[$j$$] && $sb$$.push("=", goog.string.urlEncode($key$$69_val$$[$j$$])), $count$$++
      }
    }else {
      0 < $count$$ && $sb$$.push("&"), $sb$$.push($encodedKey$$), "" !== $key$$69_val$$ && $sb$$.push("=", goog.string.urlEncode($key$$69_val$$)), $count$$++
    }
  }
  return this.encodedQuery_ = $sb$$.join("")
};
goog.Uri.QueryData.prototype.toDecodedString = function $goog$Uri$QueryData$$toDecodedString$() {
  this.decodedQuery_ || (this.decodedQuery_ = goog.Uri.decodeOrEmpty_(this.toString()));
  return this.decodedQuery_
};
goog.Uri.QueryData.prototype.invalidateCache_ = function $goog$Uri$QueryData$$invalidateCache_$() {
  delete this.decodedQuery_;
  delete this.encodedQuery_;
  this.uri_ && delete this.uri_.cachedToString_
};
goog.Uri.QueryData.prototype.filterKeys = function $goog$Uri$QueryData$$filterKeys$($keys$$) {
  this.ensureKeyMapInitialized_();
  goog.structs.forEach(this.keyMap_, function($value$$, $key$$) {
    goog.array.contains($keys$$, $key$$) || this.remove($key$$)
  }, this);
  return this
};
goog.Uri.QueryData.prototype.clone = function $goog$Uri$QueryData$$clone$() {
  var $rv$$ = new goog.Uri.QueryData;
  this.decodedQuery_ && ($rv$$.decodedQuery_ = this.decodedQuery_);
  this.encodedQuery_ && ($rv$$.encodedQuery_ = this.encodedQuery_);
  this.keyMap_ && ($rv$$.keyMap_ = this.keyMap_.clone());
  return $rv$$
};
goog.Uri.QueryData.prototype.getKeyName_ = function $goog$Uri$QueryData$$getKeyName_$($arg$$) {
  $arg$$ = String($arg$$);
  this.ignoreCase_ && ($arg$$ = $arg$$.toLowerCase());
  return $arg$$
};
goog.Uri.QueryData.prototype.setIgnoreCase = function $goog$Uri$QueryData$$setIgnoreCase$($ignoreCase$$) {
  $ignoreCase$$ && !this.ignoreCase_ && (this.ensureKeyMapInitialized_(), this.invalidateCache_(), goog.structs.forEach(this.keyMap_, function($value$$, $key$$) {
    var $lowerCase$$ = $key$$.toLowerCase();
    $key$$ != $lowerCase$$ && (this.remove($key$$), this.add($lowerCase$$, $value$$))
  }, this));
  this.ignoreCase_ = $ignoreCase$$
};
goog.Uri.QueryData.prototype.extend = function $goog$Uri$QueryData$$extend$($var_args$$) {
  for(var $i$$ = 0;$i$$ < arguments.length;$i$$++) {
    goog.structs.forEach(arguments[$i$$], function($value$$, $key$$) {
      this.add($key$$, $value$$)
    }, this)
  }
};
goog.dom = {};
goog.dom.classes = {};
goog.dom.classes.set = function $goog$dom$classes$set$($element$$, $className$$) {
  $element$$.className = $className$$
};
goog.dom.classes.get = function $goog$dom$classes$get$($className$$4_element$$) {
  return($className$$4_element$$ = $className$$4_element$$.className) && "function" == typeof $className$$4_element$$.split ? $className$$4_element$$.split(/\s+/) : []
};
goog.dom.classes.add = function $goog$dom$classes$add$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$4_b$$ = goog.array.slice(arguments, 1), $args$$4_b$$ = goog.dom.classes.add_($classes$$, $args$$4_b$$);
  $element$$.className = $classes$$.join(" ");
  return $args$$4_b$$
};
goog.dom.classes.remove = function $goog$dom$classes$remove$($element$$, $var_args$$) {
  var $classes$$ = goog.dom.classes.get($element$$), $args$$5_b$$ = goog.array.slice(arguments, 1), $args$$5_b$$ = goog.dom.classes.remove_($classes$$, $args$$5_b$$);
  $element$$.className = $classes$$.join(" ");
  return $args$$5_b$$
};
goog.dom.classes.add_ = function $goog$dom$classes$add_$($classes$$, $args$$) {
  for(var $rv$$ = 0, $i$$ = 0;$i$$ < $args$$.length;$i$$++) {
    goog.array.contains($classes$$, $args$$[$i$$]) || ($classes$$.push($args$$[$i$$]), $rv$$++)
  }
  return $rv$$ == $args$$.length
};
goog.dom.classes.remove_ = function $goog$dom$classes$remove_$($classes$$, $args$$) {
  for(var $rv$$ = 0, $i$$ = 0;$i$$ < $classes$$.length;$i$$++) {
    goog.array.contains($args$$, $classes$$[$i$$]) && (goog.array.splice($classes$$, $i$$--, 1), $rv$$++)
  }
  return $rv$$ == $args$$.length
};
goog.dom.classes.swap = function $goog$dom$classes$swap$($element$$, $fromClass$$, $toClass$$) {
  for(var $classes$$ = goog.dom.classes.get($element$$), $removed$$ = !1, $i$$ = 0;$i$$ < $classes$$.length;$i$$++) {
    $classes$$[$i$$] == $fromClass$$ && (goog.array.splice($classes$$, $i$$--, 1), $removed$$ = !0)
  }
  $removed$$ && ($classes$$.push($toClass$$), $element$$.className = $classes$$.join(" "));
  return $removed$$
};
goog.dom.classes.addRemove = function $goog$dom$classes$addRemove$($element$$, $classesToRemove$$, $classesToAdd$$) {
  var $classes$$ = goog.dom.classes.get($element$$);
  goog.isString($classesToRemove$$) ? goog.array.remove($classes$$, $classesToRemove$$) : goog.isArray($classesToRemove$$) && goog.dom.classes.remove_($classes$$, $classesToRemove$$);
  goog.isString($classesToAdd$$) && !goog.array.contains($classes$$, $classesToAdd$$) ? $classes$$.push($classesToAdd$$) : goog.isArray($classesToAdd$$) && goog.dom.classes.add_($classes$$, $classesToAdd$$);
  $element$$.className = $classes$$.join(" ")
};
goog.dom.classes.has = function $goog$dom$classes$has$($element$$, $className$$) {
  return goog.array.contains(goog.dom.classes.get($element$$), $className$$)
};
goog.dom.classes.enable = function $goog$dom$classes$enable$($element$$, $className$$, $enabled$$) {
  $enabled$$ ? goog.dom.classes.add($element$$, $className$$) : goog.dom.classes.remove($element$$, $className$$)
};
goog.dom.classes.toggle = function $goog$dom$classes$toggle$($element$$, $className$$) {
  var $add$$ = !goog.dom.classes.has($element$$, $className$$);
  goog.dom.classes.enable($element$$, $className$$, $add$$);
  return $add$$
};
goog.dom.TagName = {A:"A", ABBR:"ABBR", ACRONYM:"ACRONYM", ADDRESS:"ADDRESS", APPLET:"APPLET", AREA:"AREA", B:"B", BASE:"BASE", BASEFONT:"BASEFONT", BDO:"BDO", BIG:"BIG", BLOCKQUOTE:"BLOCKQUOTE", BODY:"BODY", BR:"BR", BUTTON:"BUTTON", CANVAS:"CANVAS", CAPTION:"CAPTION", CENTER:"CENTER", CITE:"CITE", CODE:"CODE", COL:"COL", COLGROUP:"COLGROUP", DD:"DD", DEL:"DEL", DFN:"DFN", DIR:"DIR", DIV:"DIV", DL:"DL", DT:"DT", EM:"EM", FIELDSET:"FIELDSET", FONT:"FONT", FORM:"FORM", FRAME:"FRAME", FRAMESET:"FRAMESET", 
H1:"H1", H2:"H2", H3:"H3", H4:"H4", H5:"H5", H6:"H6", HEAD:"HEAD", HR:"HR", HTML:"HTML", I:"I", IFRAME:"IFRAME", IMG:"IMG", INPUT:"INPUT", INS:"INS", ISINDEX:"ISINDEX", KBD:"KBD", LABEL:"LABEL", LEGEND:"LEGEND", LI:"LI", LINK:"LINK", MAP:"MAP", MENU:"MENU", META:"META", NOFRAMES:"NOFRAMES", NOSCRIPT:"NOSCRIPT", OBJECT:"OBJECT", OL:"OL", OPTGROUP:"OPTGROUP", OPTION:"OPTION", P:"P", PARAM:"PARAM", PRE:"PRE", Q:"Q", S:"S", SAMP:"SAMP", SCRIPT:"SCRIPT", SELECT:"SELECT", SMALL:"SMALL", SPAN:"SPAN", STRIKE:"STRIKE", 
STRONG:"STRONG", STYLE:"STYLE", SUB:"SUB", SUP:"SUP", TABLE:"TABLE", TBODY:"TBODY", TD:"TD", TEXTAREA:"TEXTAREA", TFOOT:"TFOOT", TH:"TH", THEAD:"THEAD", TITLE:"TITLE", TR:"TR", TT:"TT", U:"U", UL:"UL", VAR:"VAR"};
goog.math = {};
goog.math.Size = function $goog$math$Size$($width$$, $height$$) {
  this.width = $width$$;
  this.height = $height$$
};
goog.math.Size.equals = function $goog$math$Size$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? !0 : !$a$$ || !$b$$ ? !1 : $a$$.width == $b$$.width && $a$$.height == $b$$.height
};
goog.math.Size.prototype.clone = function $goog$math$Size$$clone$() {
  return new goog.math.Size(this.width, this.height)
};
goog.DEBUG && (goog.math.Size.prototype.toString = function $goog$math$Size$$toString$() {
  return"(" + this.width + " x " + this.height + ")"
});
goog.math.Size.prototype.getLongest = function $goog$math$Size$$getLongest$() {
  return Math.max(this.width, this.height)
};
goog.math.Size.prototype.getShortest = function $goog$math$Size$$getShortest$() {
  return Math.min(this.width, this.height)
};
goog.math.Size.prototype.area = function $goog$math$Size$$area$() {
  return this.width * this.height
};
goog.math.Size.prototype.perimeter = function $goog$math$Size$$perimeter$() {
  return(this.width + this.height) * 2
};
goog.math.Size.prototype.aspectRatio = function $goog$math$Size$$aspectRatio$() {
  return this.width / this.height
};
goog.math.Size.prototype.isEmpty = function $goog$math$Size$$isEmpty$() {
  return!this.area()
};
goog.math.Size.prototype.ceil = function $goog$math$Size$$ceil$() {
  this.width = Math.ceil(this.width);
  this.height = Math.ceil(this.height);
  return this
};
goog.math.Size.prototype.fitsInside = function $goog$math$Size$$fitsInside$($target$$) {
  return this.width <= $target$$.width && this.height <= $target$$.height
};
goog.math.Size.prototype.floor = function $goog$math$Size$$floor$() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
goog.math.Size.prototype.round = function $goog$math$Size$$round$() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
goog.math.Size.prototype.scale = function $goog$math$Size$$scale$($s$$) {
  this.width = this.width * $s$$;
  this.height = this.height * $s$$;
  return this
};
goog.math.Size.prototype.scaleToFit = function $goog$math$Size$$scaleToFit$($s$$16_target$$) {
  $s$$16_target$$ = this.aspectRatio() > $s$$16_target$$.aspectRatio() ? $s$$16_target$$.width / this.width : $s$$16_target$$.height / this.height;
  return this.scale($s$$16_target$$)
};
goog.dom.BrowserFeature = {CAN_ADD_NAME_OR_TYPE_ATTRIBUTES:!goog.userAgent.IE || goog.userAgent.isDocumentMode(9), CAN_USE_CHILDREN_ATTRIBUTE:!goog.userAgent.GECKO && !goog.userAgent.IE || goog.userAgent.IE && goog.userAgent.isDocumentMode(9) || goog.userAgent.GECKO && goog.userAgent.isVersion("1.9.1"), CAN_USE_INNER_TEXT:goog.userAgent.IE && !goog.userAgent.isVersion("9"), INNER_HTML_NEEDS_SCOPED_ELEMENT:goog.userAgent.IE};
goog.math.Coordinate = function $goog$math$Coordinate$($opt_x$$, $opt_y$$) {
  this.x = goog.isDef($opt_x$$) ? $opt_x$$ : 0;
  this.y = goog.isDef($opt_y$$) ? $opt_y$$ : 0
};
goog.math.Coordinate.prototype.clone = function $goog$math$Coordinate$$clone$() {
  return new goog.math.Coordinate(this.x, this.y)
};
goog.DEBUG && (goog.math.Coordinate.prototype.toString = function $goog$math$Coordinate$$toString$() {
  return"(" + this.x + ", " + this.y + ")"
});
goog.math.Coordinate.equals = function $goog$math$Coordinate$equals$($a$$, $b$$) {
  return $a$$ == $b$$ ? true : !$a$$ || !$b$$ ? false : $a$$.x == $b$$.x && $a$$.y == $b$$.y
};
goog.math.Coordinate.distance = function $goog$math$Coordinate$distance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return Math.sqrt($dx$$ * $dx$$ + $dy$$ * $dy$$)
};
goog.math.Coordinate.squaredDistance = function $goog$math$Coordinate$squaredDistance$($a$$, $b$$) {
  var $dx$$ = $a$$.x - $b$$.x, $dy$$ = $a$$.y - $b$$.y;
  return $dx$$ * $dx$$ + $dy$$ * $dy$$
};
goog.math.Coordinate.difference = function $goog$math$Coordinate$difference$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x - $b$$.x, $a$$.y - $b$$.y)
};
goog.math.Coordinate.sum = function $goog$math$Coordinate$sum$($a$$, $b$$) {
  return new goog.math.Coordinate($a$$.x + $b$$.x, $a$$.y + $b$$.y)
};
goog.dom.ASSUME_QUIRKS_MODE = !1;
goog.dom.ASSUME_STANDARDS_MODE = !1;
goog.dom.COMPAT_MODE_KNOWN_ = goog.dom.ASSUME_QUIRKS_MODE || goog.dom.ASSUME_STANDARDS_MODE;
goog.dom.NodeType = {ELEMENT:1, ATTRIBUTE:2, TEXT:3, CDATA_SECTION:4, ENTITY_REFERENCE:5, ENTITY:6, PROCESSING_INSTRUCTION:7, COMMENT:8, DOCUMENT:9, DOCUMENT_TYPE:10, DOCUMENT_FRAGMENT:11, NOTATION:12};
goog.dom.getDomHelper = function $goog$dom$getDomHelper$($opt_element$$) {
  return $opt_element$$ ? new goog.dom.DomHelper(goog.dom.getOwnerDocument($opt_element$$)) : goog.dom.defaultDomHelper_ || (goog.dom.defaultDomHelper_ = new goog.dom.DomHelper)
};
goog.dom.getDocument = function $goog$dom$getDocument$() {
  return document
};
goog.dom.getElement = function $goog$dom$getElement$($element$$) {
  return goog.isString($element$$) ? document.getElementById($element$$) : $element$$
};
goog.dom.$ = goog.dom.getElement;
goog.dom.getElementsByTagNameAndClass = function $goog$dom$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(document, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.getElementsByClass = function $goog$dom$getElementsByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document;
  return goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelectorAll("." + $className$$) : $parent$$.getElementsByClassName ? $parent$$.getElementsByClassName($className$$) : goog.dom.getElementsByTagNameAndClass_(document, "*", $className$$, $opt_el$$)
};
goog.dom.getElementByClass = function $goog$dom$getElementByClass$($className$$, $opt_el$$) {
  var $parent$$ = $opt_el$$ || document, $retVal$$ = null;
  return($retVal$$ = goog.dom.canUseQuerySelector_($parent$$) ? $parent$$.querySelector("." + $className$$) : goog.dom.getElementsByClass($className$$, $opt_el$$)[0]) || null
};
goog.dom.canUseQuerySelector_ = function $goog$dom$canUseQuerySelector_$($parent$$) {
  return $parent$$.querySelectorAll && $parent$$.querySelector && (!goog.userAgent.WEBKIT || goog.dom.isCss1CompatMode_(document) || goog.userAgent.isVersion("528"))
};
goog.dom.getElementsByTagNameAndClass_ = function $goog$dom$getElementsByTagNameAndClass_$($doc$$8_els_parent$$, $className$$10_opt_tag$$1_tagName$$, $opt_class$$, $arrayLike_opt_el$$) {
  $doc$$8_els_parent$$ = $arrayLike_opt_el$$ || $doc$$8_els_parent$$;
  $className$$10_opt_tag$$1_tagName$$ = $className$$10_opt_tag$$1_tagName$$ && "*" != $className$$10_opt_tag$$1_tagName$$ ? $className$$10_opt_tag$$1_tagName$$.toUpperCase() : "";
  if(goog.dom.canUseQuerySelector_($doc$$8_els_parent$$) && ($className$$10_opt_tag$$1_tagName$$ || $opt_class$$)) {
    return $doc$$8_els_parent$$.querySelectorAll($className$$10_opt_tag$$1_tagName$$ + ($opt_class$$ ? "." + $opt_class$$ : ""))
  }
  if($opt_class$$ && $doc$$8_els_parent$$.getElementsByClassName) {
    $doc$$8_els_parent$$ = $doc$$8_els_parent$$.getElementsByClassName($opt_class$$);
    if($className$$10_opt_tag$$1_tagName$$) {
      for(var $arrayLike_opt_el$$ = {}, $len$$ = 0, $i$$ = 0, $el$$;$el$$ = $doc$$8_els_parent$$[$i$$];$i$$++) {
        $className$$10_opt_tag$$1_tagName$$ == $el$$.nodeName && ($arrayLike_opt_el$$[$len$$++] = $el$$)
      }
      $arrayLike_opt_el$$.length = $len$$;
      return $arrayLike_opt_el$$
    }
    return $doc$$8_els_parent$$
  }
  $doc$$8_els_parent$$ = $doc$$8_els_parent$$.getElementsByTagName($className$$10_opt_tag$$1_tagName$$ || "*");
  if($opt_class$$) {
    $arrayLike_opt_el$$ = {};
    for($i$$ = $len$$ = 0;$el$$ = $doc$$8_els_parent$$[$i$$];$i$$++) {
      $className$$10_opt_tag$$1_tagName$$ = $el$$.className, "function" == typeof $className$$10_opt_tag$$1_tagName$$.split && goog.array.contains($className$$10_opt_tag$$1_tagName$$.split(/\s+/), $opt_class$$) && ($arrayLike_opt_el$$[$len$$++] = $el$$)
    }
    $arrayLike_opt_el$$.length = $len$$;
    return $arrayLike_opt_el$$
  }
  return $doc$$8_els_parent$$
};
goog.dom.$$ = goog.dom.getElementsByTagNameAndClass;
goog.dom.setProperties = function $goog$dom$setProperties$($element$$, $properties$$) {
  goog.object.forEach($properties$$, function($val$$, $key$$) {
    "style" == $key$$ ? $element$$.style.cssText = $val$$ : "class" == $key$$ ? $element$$.className = $val$$ : "for" == $key$$ ? $element$$.htmlFor = $val$$ : $key$$ in goog.dom.DIRECT_ATTRIBUTE_MAP_ ? $element$$.setAttribute(goog.dom.DIRECT_ATTRIBUTE_MAP_[$key$$], $val$$) : goog.string.startsWith($key$$, "aria-") ? $element$$.setAttribute($key$$, $val$$) : $element$$[$key$$] = $val$$
  })
};
goog.dom.DIRECT_ATTRIBUTE_MAP_ = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", rowspan:"rowSpan", valign:"vAlign", height:"height", width:"width", usemap:"useMap", frameborder:"frameBorder", maxlength:"maxLength", type:"type"};
goog.dom.getViewportSize = function $goog$dom$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize_($opt_window$$ || window)
};
goog.dom.getViewportSize_ = function $goog$dom$getViewportSize_$($el$$) {
  var $doc$$ = $el$$.document;
  if(goog.userAgent.WEBKIT && !goog.userAgent.isVersion("500") && !goog.userAgent.MOBILE) {
    "undefined" == typeof $el$$.innerHeight && ($el$$ = window);
    var $doc$$ = $el$$.innerHeight, $scrollHeight$$ = $el$$.document.documentElement.scrollHeight;
    $el$$ == $el$$.top && $scrollHeight$$ < $doc$$ && ($doc$$ -= 15);
    return new goog.math.Size($el$$.innerWidth, $doc$$)
  }
  $el$$ = goog.dom.isCss1CompatMode_($doc$$) ? $doc$$.documentElement : $doc$$.body;
  return new goog.math.Size($el$$.clientWidth, $el$$.clientHeight)
};
goog.dom.getDocumentHeight = function $goog$dom$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(window)
};
goog.dom.getDocumentHeight_ = function $goog$dom$getDocumentHeight_$($vh_win$$) {
  var $doc$$10_sh$$ = $vh_win$$.document, $body$$1_height$$ = 0;
  if($doc$$10_sh$$) {
    var $vh_win$$ = goog.dom.getViewportSize_($vh_win$$).height, $body$$1_height$$ = $doc$$10_sh$$.body, $docEl$$ = $doc$$10_sh$$.documentElement;
    if(goog.dom.isCss1CompatMode_($doc$$10_sh$$) && $docEl$$.scrollHeight) {
      $body$$1_height$$ = $docEl$$.scrollHeight != $vh_win$$ ? $docEl$$.scrollHeight : $docEl$$.offsetHeight
    }else {
      var $doc$$10_sh$$ = $docEl$$.scrollHeight, $oh$$ = $docEl$$.offsetHeight;
      $docEl$$.clientHeight != $oh$$ && ($doc$$10_sh$$ = $body$$1_height$$.scrollHeight, $oh$$ = $body$$1_height$$.offsetHeight);
      $body$$1_height$$ = $doc$$10_sh$$ > $vh_win$$ ? $doc$$10_sh$$ > $oh$$ ? $doc$$10_sh$$ : $oh$$ : $doc$$10_sh$$ < $oh$$ ? $doc$$10_sh$$ : $oh$$
    }
  }
  return $body$$1_height$$
};
goog.dom.getPageScroll = function $goog$dom$getPageScroll$($opt_window$$) {
  return goog.dom.getDomHelper(($opt_window$$ || goog.global || window).document).getDocumentScroll()
};
goog.dom.getDocumentScroll = function $goog$dom$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(document)
};
goog.dom.getDocumentScroll_ = function $goog$dom$getDocumentScroll_$($doc$$11_win$$) {
  var $el$$ = goog.dom.getDocumentScrollElement_($doc$$11_win$$), $doc$$11_win$$ = goog.dom.getWindow_($doc$$11_win$$);
  return new goog.math.Coordinate($doc$$11_win$$.pageXOffset || $el$$.scrollLeft, $doc$$11_win$$.pageYOffset || $el$$.scrollTop)
};
goog.dom.getDocumentScrollElement = function $goog$dom$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(document)
};
goog.dom.getDocumentScrollElement_ = function $goog$dom$getDocumentScrollElement_$($doc$$) {
  return!goog.userAgent.WEBKIT && goog.dom.isCss1CompatMode_($doc$$) ? $doc$$.documentElement : $doc$$.body
};
goog.dom.getWindow = function $goog$dom$getWindow$($opt_doc$$) {
  return $opt_doc$$ ? goog.dom.getWindow_($opt_doc$$) : window
};
goog.dom.getWindow_ = function $goog$dom$getWindow_$($doc$$) {
  return $doc$$.parentWindow || $doc$$.defaultView
};
goog.dom.createDom = function $goog$dom$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(document, arguments)
};
goog.dom.createDom_ = function $goog$dom$createDom_$($doc$$, $args$$) {
  var $element$$17_tagName$$ = $args$$[0], $attributes$$ = $args$$[1];
  if(!goog.dom.BrowserFeature.CAN_ADD_NAME_OR_TYPE_ATTRIBUTES && $attributes$$ && ($attributes$$.name || $attributes$$.type)) {
    $element$$17_tagName$$ = ["<", $element$$17_tagName$$];
    $attributes$$.name && $element$$17_tagName$$.push(' name="', goog.string.htmlEscape($attributes$$.name), '"');
    if($attributes$$.type) {
      $element$$17_tagName$$.push(' type="', goog.string.htmlEscape($attributes$$.type), '"');
      var $clone$$ = {};
      goog.object.extend($clone$$, $attributes$$);
      $attributes$$ = $clone$$;
      delete $attributes$$.type
    }
    $element$$17_tagName$$.push(">");
    $element$$17_tagName$$ = $element$$17_tagName$$.join("")
  }
  $element$$17_tagName$$ = $doc$$.createElement($element$$17_tagName$$);
  $attributes$$ && (goog.isString($attributes$$) ? $element$$17_tagName$$.className = $attributes$$ : goog.isArray($attributes$$) ? goog.dom.classes.add.apply(null, [$element$$17_tagName$$].concat($attributes$$)) : goog.dom.setProperties($element$$17_tagName$$, $attributes$$));
  2 < $args$$.length && goog.dom.append_($doc$$, $element$$17_tagName$$, $args$$, 2);
  return $element$$17_tagName$$
};
goog.dom.append_ = function $goog$dom$append_$($doc$$, $parent$$, $args$$, $i$$81_startIndex$$) {
  function $childHandler$$($child$$) {
    $child$$ && $parent$$.appendChild(goog.isString($child$$) ? $doc$$.createTextNode($child$$) : $child$$)
  }
  for(;$i$$81_startIndex$$ < $args$$.length;$i$$81_startIndex$$++) {
    var $arg$$ = $args$$[$i$$81_startIndex$$];
    goog.isArrayLike($arg$$) && !goog.dom.isNodeLike($arg$$) ? goog.array.forEach(goog.dom.isNodeList($arg$$) ? goog.array.clone($arg$$) : $arg$$, $childHandler$$) : $childHandler$$($arg$$)
  }
};
goog.dom.$dom = goog.dom.createDom;
goog.dom.createElement = function $goog$dom$createElement$($name$$) {
  return document.createElement($name$$)
};
goog.dom.createTextNode = function $goog$dom$createTextNode$($content$$) {
  return document.createTextNode($content$$)
};
goog.dom.createTable = function $goog$dom$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(document, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.createTable_ = function $goog$dom$createTable_$($doc$$16_elem$$, $rows$$, $columns$$, $fillWithNbsp$$) {
  for(var $rowHtml$$ = ["<tr>"], $i$$ = 0;$i$$ < $columns$$;$i$$++) {
    $rowHtml$$.push($fillWithNbsp$$ ? "<td>&nbsp;</td>" : "<td></td>")
  }
  $rowHtml$$.push("</tr>");
  $rowHtml$$ = $rowHtml$$.join("");
  $columns$$ = ["<table>"];
  for($i$$ = 0;$i$$ < $rows$$;$i$$++) {
    $columns$$.push($rowHtml$$)
  }
  $columns$$.push("</table>");
  $doc$$16_elem$$ = $doc$$16_elem$$.createElement(goog.dom.TagName.DIV);
  $doc$$16_elem$$.innerHTML = $columns$$.join("");
  return $doc$$16_elem$$.removeChild($doc$$16_elem$$.firstChild)
};
goog.dom.htmlToDocumentFragment = function $goog$dom$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(document, $htmlString$$)
};
goog.dom.htmlToDocumentFragment_ = function $goog$dom$htmlToDocumentFragment_$($doc$$, $htmlString$$) {
  var $tempDiv$$ = $doc$$.createElement("div");
  goog.dom.BrowserFeature.INNER_HTML_NEEDS_SCOPED_ELEMENT ? ($tempDiv$$.innerHTML = "<br>" + $htmlString$$, $tempDiv$$.removeChild($tempDiv$$.firstChild)) : $tempDiv$$.innerHTML = $htmlString$$;
  if(1 == $tempDiv$$.childNodes.length) {
    return $tempDiv$$.removeChild($tempDiv$$.firstChild)
  }
  for(var $fragment$$ = $doc$$.createDocumentFragment();$tempDiv$$.firstChild;) {
    $fragment$$.appendChild($tempDiv$$.firstChild)
  }
  return $fragment$$
};
goog.dom.getCompatMode = function $goog$dom$getCompatMode$() {
  return goog.dom.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.isCss1CompatMode = function $goog$dom$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(document)
};
goog.dom.isCss1CompatMode_ = function $goog$dom$isCss1CompatMode_$($doc$$) {
  return goog.dom.COMPAT_MODE_KNOWN_ ? goog.dom.ASSUME_STANDARDS_MODE : "CSS1Compat" == $doc$$.compatMode
};
goog.dom.canHaveChildren = function $goog$dom$canHaveChildren$($node$$) {
  if($node$$.nodeType != goog.dom.NodeType.ELEMENT) {
    return!1
  }
  switch($node$$.tagName) {
    case goog.dom.TagName.APPLET:
    ;
    case goog.dom.TagName.AREA:
    ;
    case goog.dom.TagName.BASE:
    ;
    case goog.dom.TagName.BR:
    ;
    case goog.dom.TagName.COL:
    ;
    case goog.dom.TagName.FRAME:
    ;
    case goog.dom.TagName.HR:
    ;
    case goog.dom.TagName.IMG:
    ;
    case goog.dom.TagName.INPUT:
    ;
    case goog.dom.TagName.IFRAME:
    ;
    case goog.dom.TagName.ISINDEX:
    ;
    case goog.dom.TagName.LINK:
    ;
    case goog.dom.TagName.NOFRAMES:
    ;
    case goog.dom.TagName.NOSCRIPT:
    ;
    case goog.dom.TagName.META:
    ;
    case goog.dom.TagName.OBJECT:
    ;
    case goog.dom.TagName.PARAM:
    ;
    case goog.dom.TagName.SCRIPT:
    ;
    case goog.dom.TagName.STYLE:
      return!1
  }
  return!0
};
goog.dom.appendChild = function $goog$dom$appendChild$($parent$$, $child$$) {
  $parent$$.appendChild($child$$)
};
goog.dom.append = function $goog$dom$append$($parent$$, $var_args$$) {
  goog.dom.append_(goog.dom.getOwnerDocument($parent$$), $parent$$, arguments, 1)
};
goog.dom.removeChildren = function $goog$dom$removeChildren$($node$$) {
  for(var $child$$;$child$$ = $node$$.firstChild;) {
    $node$$.removeChild($child$$)
  }
};
goog.dom.insertSiblingBefore = function $goog$dom$insertSiblingBefore$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$)
};
goog.dom.insertSiblingAfter = function $goog$dom$insertSiblingAfter$($newNode$$, $refNode$$) {
  $refNode$$.parentNode && $refNode$$.parentNode.insertBefore($newNode$$, $refNode$$.nextSibling)
};
goog.dom.insertChildAt = function $goog$dom$insertChildAt$($parent$$, $child$$, $index$$) {
  $parent$$.insertBefore($child$$, $parent$$.childNodes[$index$$] || null)
};
goog.dom.removeNode = function $goog$dom$removeNode$($node$$) {
  return $node$$ && $node$$.parentNode ? $node$$.parentNode.removeChild($node$$) : null
};
goog.dom.replaceNode = function $goog$dom$replaceNode$($newNode$$, $oldNode$$) {
  var $parent$$ = $oldNode$$.parentNode;
  $parent$$ && $parent$$.replaceChild($newNode$$, $oldNode$$)
};
goog.dom.flattenElement = function $goog$dom$flattenElement$($element$$) {
  var $child$$, $parent$$ = $element$$.parentNode;
  if($parent$$ && $parent$$.nodeType != goog.dom.NodeType.DOCUMENT_FRAGMENT) {
    if($element$$.removeNode) {
      return $element$$.removeNode(!1)
    }
    for(;$child$$ = $element$$.firstChild;) {
      $parent$$.insertBefore($child$$, $element$$)
    }
    return goog.dom.removeNode($element$$)
  }
};
goog.dom.getChildren = function $goog$dom$getChildren$($element$$) {
  return goog.dom.BrowserFeature.CAN_USE_CHILDREN_ATTRIBUTE && void 0 != $element$$.children ? $element$$.children : goog.array.filter($element$$.childNodes, function($node$$) {
    return $node$$.nodeType == goog.dom.NodeType.ELEMENT
  })
};
goog.dom.getFirstElementChild = function $goog$dom$getFirstElementChild$($node$$) {
  return void 0 != $node$$.firstElementChild ? $node$$.firstElementChild : goog.dom.getNextElementNode_($node$$.firstChild, !0)
};
goog.dom.getLastElementChild = function $goog$dom$getLastElementChild$($node$$) {
  return void 0 != $node$$.lastElementChild ? $node$$.lastElementChild : goog.dom.getNextElementNode_($node$$.lastChild, !1)
};
goog.dom.getNextElementSibling = function $goog$dom$getNextElementSibling$($node$$) {
  return void 0 != $node$$.nextElementSibling ? $node$$.nextElementSibling : goog.dom.getNextElementNode_($node$$.nextSibling, !0)
};
goog.dom.getPreviousElementSibling = function $goog$dom$getPreviousElementSibling$($node$$) {
  return void 0 != $node$$.previousElementSibling ? $node$$.previousElementSibling : goog.dom.getNextElementNode_($node$$.previousSibling, !1)
};
goog.dom.getNextElementNode_ = function $goog$dom$getNextElementNode_$($node$$, $forward$$) {
  for(;$node$$ && $node$$.nodeType != goog.dom.NodeType.ELEMENT;) {
    $node$$ = $forward$$ ? $node$$.nextSibling : $node$$.previousSibling
  }
  return $node$$
};
goog.dom.getNextNode = function $goog$dom$getNextNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if($node$$.firstChild) {
    return $node$$.firstChild
  }
  for(;$node$$ && !$node$$.nextSibling;) {
    $node$$ = $node$$.parentNode
  }
  return $node$$ ? $node$$.nextSibling : null
};
goog.dom.getPreviousNode = function $goog$dom$getPreviousNode$($node$$) {
  if(!$node$$) {
    return null
  }
  if(!$node$$.previousSibling) {
    return $node$$.parentNode
  }
  for($node$$ = $node$$.previousSibling;$node$$ && $node$$.lastChild;) {
    $node$$ = $node$$.lastChild
  }
  return $node$$
};
goog.dom.isNodeLike = function $goog$dom$isNodeLike$($obj$$) {
  return goog.isObject($obj$$) && 0 < $obj$$.nodeType
};
goog.dom.isElement = function $goog$dom$isElement$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.nodeType == goog.dom.NodeType.ELEMENT
};
goog.dom.isWindow = function $goog$dom$isWindow$($obj$$) {
  return goog.isObject($obj$$) && $obj$$.window == $obj$$
};
goog.dom.contains = function $goog$dom$contains$($parent$$, $descendant$$) {
  if($parent$$.contains && $descendant$$.nodeType == goog.dom.NodeType.ELEMENT) {
    return $parent$$ == $descendant$$ || $parent$$.contains($descendant$$)
  }
  if("undefined" != typeof $parent$$.compareDocumentPosition) {
    return $parent$$ == $descendant$$ || Boolean($parent$$.compareDocumentPosition($descendant$$) & 16)
  }
  for(;$descendant$$ && $parent$$ != $descendant$$;) {
    $descendant$$ = $descendant$$.parentNode
  }
  return $descendant$$ == $parent$$
};
goog.dom.compareNodeOrder = function $goog$dom$compareNodeOrder$($node1$$, $node2$$) {
  if($node1$$ == $node2$$) {
    return 0
  }
  if($node1$$.compareDocumentPosition) {
    return $node1$$.compareDocumentPosition($node2$$) & 2 ? 1 : -1
  }
  if("sourceIndex" in $node1$$ || $node1$$.parentNode && "sourceIndex" in $node1$$.parentNode) {
    var $isElement1_range1$$ = $node1$$.nodeType == goog.dom.NodeType.ELEMENT, $doc$$ = $node2$$.nodeType == goog.dom.NodeType.ELEMENT;
    if($isElement1_range1$$ && $doc$$) {
      return $node1$$.sourceIndex - $node2$$.sourceIndex
    }
    var $parent1$$ = $node1$$.parentNode, $parent2$$ = $node2$$.parentNode;
    return $parent1$$ == $parent2$$ ? goog.dom.compareSiblingOrder_($node1$$, $node2$$) : !$isElement1_range1$$ && goog.dom.contains($parent1$$, $node2$$) ? -1 * goog.dom.compareParentsDescendantNodeIe_($node1$$, $node2$$) : !$doc$$ && goog.dom.contains($parent2$$, $node1$$) ? goog.dom.compareParentsDescendantNodeIe_($node2$$, $node1$$) : ($isElement1_range1$$ ? $node1$$.sourceIndex : $parent1$$.sourceIndex) - ($doc$$ ? $node2$$.sourceIndex : $parent2$$.sourceIndex)
  }
  $doc$$ = goog.dom.getOwnerDocument($node1$$);
  $isElement1_range1$$ = $doc$$.createRange();
  $isElement1_range1$$.selectNode($node1$$);
  $isElement1_range1$$.collapse(!0);
  $doc$$ = $doc$$.createRange();
  $doc$$.selectNode($node2$$);
  $doc$$.collapse(!0);
  return $isElement1_range1$$.compareBoundaryPoints(goog.global.Range.START_TO_END, $doc$$)
};
goog.dom.compareParentsDescendantNodeIe_ = function $goog$dom$compareParentsDescendantNodeIe_$($textNode$$, $node$$) {
  var $parent$$ = $textNode$$.parentNode;
  if($parent$$ == $node$$) {
    return-1
  }
  for(var $sibling$$ = $node$$;$sibling$$.parentNode != $parent$$;) {
    $sibling$$ = $sibling$$.parentNode
  }
  return goog.dom.compareSiblingOrder_($sibling$$, $textNode$$)
};
goog.dom.compareSiblingOrder_ = function $goog$dom$compareSiblingOrder_$($node1$$, $node2$$) {
  for(var $s$$ = $node2$$;$s$$ = $s$$.previousSibling;) {
    if($s$$ == $node1$$) {
      return-1
    }
  }
  return 1
};
goog.dom.findCommonAncestor = function $goog$dom$findCommonAncestor$($var_args$$) {
  var $i$$, $count$$ = arguments.length;
  if($count$$) {
    if(1 == $count$$) {
      return arguments[0]
    }
  }else {
    return null
  }
  var $paths$$ = [], $minLength$$ = Infinity;
  for($i$$ = 0;$i$$ < $count$$;$i$$++) {
    for(var $ancestors_output$$ = [], $first$$1_node$$ = arguments[$i$$];$first$$1_node$$;) {
      $ancestors_output$$.unshift($first$$1_node$$), $first$$1_node$$ = $first$$1_node$$.parentNode
    }
    $paths$$.push($ancestors_output$$);
    $minLength$$ = Math.min($minLength$$, $ancestors_output$$.length)
  }
  $ancestors_output$$ = null;
  for($i$$ = 0;$i$$ < $minLength$$;$i$$++) {
    for(var $first$$1_node$$ = $paths$$[0][$i$$], $j$$ = 1;$j$$ < $count$$;$j$$++) {
      if($first$$1_node$$ != $paths$$[$j$$][$i$$]) {
        return $ancestors_output$$
      }
    }
    $ancestors_output$$ = $first$$1_node$$
  }
  return $ancestors_output$$
};
goog.dom.getOwnerDocument = function $goog$dom$getOwnerDocument$($node$$) {
  return $node$$.nodeType == goog.dom.NodeType.DOCUMENT ? $node$$ : $node$$.ownerDocument || $node$$.document
};
goog.dom.getFrameContentDocument = function $goog$dom$getFrameContentDocument$($frame$$) {
  return $frame$$.contentDocument || $frame$$.contentWindow.document
};
goog.dom.getFrameContentWindow = function $goog$dom$getFrameContentWindow$($frame$$) {
  return $frame$$.contentWindow || goog.dom.getWindow_(goog.dom.getFrameContentDocument($frame$$))
};
goog.dom.setTextContent = function $goog$dom$setTextContent$($element$$, $text$$) {
  if("textContent" in $element$$) {
    $element$$.textContent = $text$$
  }else {
    if($element$$.firstChild && $element$$.firstChild.nodeType == goog.dom.NodeType.TEXT) {
      for(;$element$$.lastChild != $element$$.firstChild;) {
        $element$$.removeChild($element$$.lastChild)
      }
      $element$$.firstChild.data = $text$$
    }else {
      goog.dom.removeChildren($element$$);
      var $doc$$ = goog.dom.getOwnerDocument($element$$);
      $element$$.appendChild($doc$$.createTextNode($text$$))
    }
  }
};
goog.dom.getOuterHtml = function $goog$dom$getOuterHtml$($element$$) {
  if("outerHTML" in $element$$) {
    return $element$$.outerHTML
  }
  var $div$$ = goog.dom.getOwnerDocument($element$$).createElement("div");
  $div$$.appendChild($element$$.cloneNode(!0));
  return $div$$.innerHTML
};
goog.dom.findNode = function $goog$dom$findNode$($root$$, $p$$) {
  var $rv$$ = [];
  return goog.dom.findNodes_($root$$, $p$$, $rv$$, !0) ? $rv$$[0] : void 0
};
goog.dom.findNodes = function $goog$dom$findNodes$($root$$, $p$$) {
  var $rv$$ = [];
  goog.dom.findNodes_($root$$, $p$$, $rv$$, !1);
  return $rv$$
};
goog.dom.findNodes_ = function $goog$dom$findNodes_$($child$$6_root$$, $p$$, $rv$$, $findOne$$) {
  if(null != $child$$6_root$$) {
    for($child$$6_root$$ = $child$$6_root$$.firstChild;$child$$6_root$$;) {
      if($p$$($child$$6_root$$) && ($rv$$.push($child$$6_root$$), $findOne$$) || goog.dom.findNodes_($child$$6_root$$, $p$$, $rv$$, $findOne$$)) {
        return!0
      }
      $child$$6_root$$ = $child$$6_root$$.nextSibling
    }
  }
  return!1
};
goog.dom.TAGS_TO_IGNORE_ = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1};
goog.dom.PREDEFINED_TAG_VALUES_ = {IMG:" ", BR:"\n"};
goog.dom.isFocusableTabIndex = function $goog$dom$isFocusableTabIndex$($element$$22_index$$) {
  var $attrNode$$ = $element$$22_index$$.getAttributeNode("tabindex");
  return $attrNode$$ && $attrNode$$.specified ? ($element$$22_index$$ = $element$$22_index$$.tabIndex, goog.isNumber($element$$22_index$$) && 0 <= $element$$22_index$$ && 32768 > $element$$22_index$$) : !1
};
goog.dom.setFocusableTabIndex = function $goog$dom$setFocusableTabIndex$($element$$, $enable$$) {
  $enable$$ ? $element$$.tabIndex = 0 : ($element$$.tabIndex = -1, $element$$.removeAttribute("tabIndex"))
};
goog.dom.getTextContent = function $goog$dom$getTextContent$($node$$) {
  if(goog.dom.BrowserFeature.CAN_USE_INNER_TEXT && "innerText" in $node$$) {
    $node$$ = goog.string.canonicalizeNewlines($node$$.innerText)
  }else {
    var $buf$$ = [];
    goog.dom.getTextContent_($node$$, $buf$$, !0);
    $node$$ = $buf$$.join("")
  }
  $node$$ = $node$$.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  $node$$ = $node$$.replace(/\u200B/g, "");
  goog.dom.BrowserFeature.CAN_USE_INNER_TEXT || ($node$$ = $node$$.replace(/ +/g, " "));
  " " != $node$$ && ($node$$ = $node$$.replace(/^\s*/, ""));
  return $node$$
};
goog.dom.getRawTextContent = function $goog$dom$getRawTextContent$($node$$) {
  var $buf$$ = [];
  goog.dom.getTextContent_($node$$, $buf$$, !1);
  return $buf$$.join("")
};
goog.dom.getTextContent_ = function $goog$dom$getTextContent_$($child$$7_node$$, $buf$$, $normalizeWhitespace$$) {
  if(!($child$$7_node$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
    if($child$$7_node$$.nodeType == goog.dom.NodeType.TEXT) {
      $normalizeWhitespace$$ ? $buf$$.push(String($child$$7_node$$.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : $buf$$.push($child$$7_node$$.nodeValue)
    }else {
      if($child$$7_node$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
        $buf$$.push(goog.dom.PREDEFINED_TAG_VALUES_[$child$$7_node$$.nodeName])
      }else {
        for($child$$7_node$$ = $child$$7_node$$.firstChild;$child$$7_node$$;) {
          goog.dom.getTextContent_($child$$7_node$$, $buf$$, $normalizeWhitespace$$), $child$$7_node$$ = $child$$7_node$$.nextSibling
        }
      }
    }
  }
};
goog.dom.getNodeTextLength = function $goog$dom$getNodeTextLength$($node$$) {
  return goog.dom.getTextContent($node$$).length
};
goog.dom.getNodeTextOffset = function $goog$dom$getNodeTextOffset$($node$$, $opt_offsetParent$$) {
  for(var $root$$ = $opt_offsetParent$$ || goog.dom.getOwnerDocument($node$$).body, $buf$$ = [];$node$$ && $node$$ != $root$$;) {
    for(var $cur$$ = $node$$;$cur$$ = $cur$$.previousSibling;) {
      $buf$$.unshift(goog.dom.getTextContent($cur$$))
    }
    $node$$ = $node$$.parentNode
  }
  return goog.string.trimLeft($buf$$.join("")).replace(/ +/g, " ").length
};
goog.dom.getNodeAtOffset = function $goog$dom$getNodeAtOffset$($parent$$, $offset$$, $opt_result$$) {
  for(var $parent$$ = [$parent$$], $pos$$ = 0, $cur$$;0 < $parent$$.length && $pos$$ < $offset$$;) {
    if($cur$$ = $parent$$.pop(), !($cur$$.nodeName in goog.dom.TAGS_TO_IGNORE_)) {
      if($cur$$.nodeType == goog.dom.NodeType.TEXT) {
        var $i$$84_text$$ = $cur$$.nodeValue.replace(/(\r\n|\r|\n)/g, "").replace(/ +/g, " "), $pos$$ = $pos$$ + $i$$84_text$$.length
      }else {
        if($cur$$.nodeName in goog.dom.PREDEFINED_TAG_VALUES_) {
          $pos$$ += goog.dom.PREDEFINED_TAG_VALUES_[$cur$$.nodeName].length
        }else {
          for($i$$84_text$$ = $cur$$.childNodes.length - 1;0 <= $i$$84_text$$;$i$$84_text$$--) {
            $parent$$.push($cur$$.childNodes[$i$$84_text$$])
          }
        }
      }
    }
  }
  goog.isObject($opt_result$$) && ($opt_result$$.remainder = $cur$$ ? $cur$$.nodeValue.length + $offset$$ - $pos$$ - 1 : 0, $opt_result$$.node = $cur$$);
  return $cur$$
};
goog.dom.isNodeList = function $goog$dom$isNodeList$($val$$) {
  if($val$$ && "number" == typeof $val$$.length) {
    if(goog.isObject($val$$)) {
      return"function" == typeof $val$$.item || "string" == typeof $val$$.item
    }
    if(goog.isFunction($val$$)) {
      return"function" == typeof $val$$.item
    }
  }
  return!1
};
goog.dom.getAncestorByTagNameAndClass = function $goog$dom$getAncestorByTagNameAndClass$($element$$, $opt_tag$$, $opt_class$$) {
  var $tagName$$ = $opt_tag$$ ? $opt_tag$$.toUpperCase() : null;
  return goog.dom.getAncestor($element$$, function($node$$) {
    return(!$tagName$$ || $node$$.nodeName == $tagName$$) && (!$opt_class$$ || goog.dom.classes.has($node$$, $opt_class$$))
  }, !0)
};
goog.dom.getAncestorByClass = function $goog$dom$getAncestorByClass$($element$$, $opt_class$$) {
  return goog.dom.getAncestorByTagNameAndClass($element$$, null, $opt_class$$)
};
goog.dom.getAncestor = function $goog$dom$getAncestor$($element$$, $matcher$$, $ignoreSearchSteps_opt_includeNode$$, $opt_maxSearchSteps$$) {
  $ignoreSearchSteps_opt_includeNode$$ || ($element$$ = $element$$.parentNode);
  for(var $ignoreSearchSteps_opt_includeNode$$ = null == $opt_maxSearchSteps$$, $steps$$ = 0;$element$$ && ($ignoreSearchSteps_opt_includeNode$$ || $steps$$ <= $opt_maxSearchSteps$$);) {
    if($matcher$$($element$$)) {
      return $element$$
    }
    $element$$ = $element$$.parentNode;
    $steps$$++
  }
  return null
};
goog.dom.getActiveElement = function $goog$dom$getActiveElement$($doc$$) {
  try {
    return $doc$$ && $doc$$.activeElement
  }catch($e$$) {
  }
  return null
};
goog.dom.DomHelper = function $goog$dom$DomHelper$($opt_document$$) {
  this.document_ = $opt_document$$ || goog.global.document || document
};
goog.dom.DomHelper.prototype.getDomHelper = goog.dom.getDomHelper;
goog.dom.DomHelper.prototype.setDocument = function $goog$dom$DomHelper$$setDocument$($document$$) {
  this.document_ = $document$$
};
goog.dom.DomHelper.prototype.getDocument = function $goog$dom$DomHelper$$getDocument$() {
  return this.document_
};
goog.dom.DomHelper.prototype.getElement = function $goog$dom$DomHelper$$getElement$($element$$) {
  return goog.isString($element$$) ? this.document_.getElementById($element$$) : $element$$
};
goog.dom.DomHelper.prototype.$ = goog.dom.DomHelper.prototype.getElement;
goog.dom.DomHelper.prototype.getElementsByTagNameAndClass = function $goog$dom$DomHelper$$getElementsByTagNameAndClass$($opt_tag$$, $opt_class$$, $opt_el$$) {
  return goog.dom.getElementsByTagNameAndClass_(this.document_, $opt_tag$$, $opt_class$$, $opt_el$$)
};
goog.dom.DomHelper.prototype.getElementsByClass = function $goog$dom$DomHelper$$getElementsByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementsByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.getElementByClass = function $goog$dom$DomHelper$$getElementByClass$($className$$, $opt_el$$) {
  return goog.dom.getElementByClass($className$$, $opt_el$$ || this.document_)
};
goog.dom.DomHelper.prototype.$$ = goog.dom.DomHelper.prototype.getElementsByTagNameAndClass;
goog.dom.DomHelper.prototype.setProperties = goog.dom.setProperties;
goog.dom.DomHelper.prototype.getViewportSize = function $goog$dom$DomHelper$$getViewportSize$($opt_window$$) {
  return goog.dom.getViewportSize($opt_window$$ || this.getWindow())
};
goog.dom.DomHelper.prototype.getDocumentHeight = function $goog$dom$DomHelper$$getDocumentHeight$() {
  return goog.dom.getDocumentHeight_(this.getWindow())
};
goog.dom.DomHelper.prototype.createDom = function $goog$dom$DomHelper$$createDom$($tagName$$, $opt_attributes$$, $var_args$$) {
  return goog.dom.createDom_(this.document_, arguments)
};
goog.dom.DomHelper.prototype.$dom = goog.dom.DomHelper.prototype.createDom;
goog.dom.DomHelper.prototype.createElement = function $goog$dom$DomHelper$$createElement$($name$$) {
  return this.document_.createElement($name$$)
};
goog.dom.DomHelper.prototype.createTextNode = function $goog$dom$DomHelper$$createTextNode$($content$$) {
  return this.document_.createTextNode($content$$)
};
goog.dom.DomHelper.prototype.createTable = function $goog$dom$DomHelper$$createTable$($rows$$, $columns$$, $opt_fillWithNbsp$$) {
  return goog.dom.createTable_(this.document_, $rows$$, $columns$$, !!$opt_fillWithNbsp$$)
};
goog.dom.DomHelper.prototype.htmlToDocumentFragment = function $goog$dom$DomHelper$$htmlToDocumentFragment$($htmlString$$) {
  return goog.dom.htmlToDocumentFragment_(this.document_, $htmlString$$)
};
goog.dom.DomHelper.prototype.getCompatMode = function $goog$dom$DomHelper$$getCompatMode$() {
  return this.isCss1CompatMode() ? "CSS1Compat" : "BackCompat"
};
goog.dom.DomHelper.prototype.isCss1CompatMode = function $goog$dom$DomHelper$$isCss1CompatMode$() {
  return goog.dom.isCss1CompatMode_(this.document_)
};
goog.dom.DomHelper.prototype.getWindow = function $goog$dom$DomHelper$$getWindow$() {
  return goog.dom.getWindow_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScrollElement = function $goog$dom$DomHelper$$getDocumentScrollElement$() {
  return goog.dom.getDocumentScrollElement_(this.document_)
};
goog.dom.DomHelper.prototype.getDocumentScroll = function $goog$dom$DomHelper$$getDocumentScroll$() {
  return goog.dom.getDocumentScroll_(this.document_)
};
goog.dom.DomHelper.prototype.appendChild = goog.dom.appendChild;
goog.dom.DomHelper.prototype.append = goog.dom.append;
goog.dom.DomHelper.prototype.removeChildren = goog.dom.removeChildren;
goog.dom.DomHelper.prototype.insertSiblingBefore = goog.dom.insertSiblingBefore;
goog.dom.DomHelper.prototype.insertSiblingAfter = goog.dom.insertSiblingAfter;
goog.dom.DomHelper.prototype.removeNode = goog.dom.removeNode;
goog.dom.DomHelper.prototype.replaceNode = goog.dom.replaceNode;
goog.dom.DomHelper.prototype.flattenElement = goog.dom.flattenElement;
goog.dom.DomHelper.prototype.getFirstElementChild = goog.dom.getFirstElementChild;
goog.dom.DomHelper.prototype.getLastElementChild = goog.dom.getLastElementChild;
goog.dom.DomHelper.prototype.getNextElementSibling = goog.dom.getNextElementSibling;
goog.dom.DomHelper.prototype.getPreviousElementSibling = goog.dom.getPreviousElementSibling;
goog.dom.DomHelper.prototype.getNextNode = goog.dom.getNextNode;
goog.dom.DomHelper.prototype.getPreviousNode = goog.dom.getPreviousNode;
goog.dom.DomHelper.prototype.isNodeLike = goog.dom.isNodeLike;
goog.dom.DomHelper.prototype.contains = goog.dom.contains;
goog.dom.DomHelper.prototype.getOwnerDocument = goog.dom.getOwnerDocument;
goog.dom.DomHelper.prototype.getFrameContentDocument = goog.dom.getFrameContentDocument;
goog.dom.DomHelper.prototype.getFrameContentWindow = goog.dom.getFrameContentWindow;
goog.dom.DomHelper.prototype.setTextContent = goog.dom.setTextContent;
goog.dom.DomHelper.prototype.findNode = goog.dom.findNode;
goog.dom.DomHelper.prototype.findNodes = goog.dom.findNodes;
goog.dom.DomHelper.prototype.getTextContent = goog.dom.getTextContent;
goog.dom.DomHelper.prototype.getNodeTextLength = goog.dom.getNodeTextLength;
goog.dom.DomHelper.prototype.getNodeTextOffset = goog.dom.getNodeTextOffset;
goog.dom.DomHelper.prototype.getAncestorByTagNameAndClass = goog.dom.getAncestorByTagNameAndClass;
goog.dom.DomHelper.prototype.getAncestorByClass = goog.dom.getAncestorByClass;
goog.dom.DomHelper.prototype.getAncestor = goog.dom.getAncestor;
goog.net.Jsonp = function $goog$net$Jsonp$($uri$$, $opt_callbackParamName$$) {
  this.uri_ = new goog.Uri($uri$$);
  this.callbackParamName_ = $opt_callbackParamName$$ ? $opt_callbackParamName$$ : "callback";
  this.timeout_ = 5E3
};
goog.net.Jsonp.CALLBACKS = "_callbacks_";
goog.net.Jsonp.scriptCounter_ = 0;
goog.net.Jsonp.prototype.setRequestTimeout = function $goog$net$Jsonp$$setRequestTimeout$($timeout$$) {
  this.timeout_ = $timeout$$
};
goog.net.Jsonp.prototype.getRequestTimeout = function $goog$net$Jsonp$$getRequestTimeout$() {
  return this.timeout_
};
goog.net.Jsonp.prototype.send = function $goog$net$Jsonp$$send$($opt_payload_payload$$, $opt_replyCallback_reply$$, $error$$3_opt_errorCallback$$7_uri$$, $id$$) {
  $opt_payload_payload$$ = $opt_payload_payload$$ || null;
  if(!document.documentElement.firstChild) {
    return $error$$3_opt_errorCallback$$7_uri$$ && $error$$3_opt_errorCallback$$7_uri$$($opt_payload_payload$$), null
  }
  $id$$ = $id$$ || "_" + (goog.net.Jsonp.scriptCounter_++).toString(36) + goog.now().toString(36);
  goog.global[goog.net.Jsonp.CALLBACKS] || (goog.global[goog.net.Jsonp.CALLBACKS] = {});
  var $script$$ = goog.dom.createElement("script"), $timeout$$ = null;
  0 < this.timeout_ && ($error$$3_opt_errorCallback$$7_uri$$ = goog.net.Jsonp.newErrorHandler_($id$$, $script$$, $opt_payload_payload$$, $error$$3_opt_errorCallback$$7_uri$$), $timeout$$ = goog.global.setTimeout($error$$3_opt_errorCallback$$7_uri$$, this.timeout_));
  $error$$3_opt_errorCallback$$7_uri$$ = this.uri_.clone();
  $opt_payload_payload$$ && goog.net.Jsonp.addPayloadToUri_($opt_payload_payload$$, $error$$3_opt_errorCallback$$7_uri$$);
  $opt_replyCallback_reply$$ && ($opt_replyCallback_reply$$ = goog.net.Jsonp.newReplyHandler_($id$$, $script$$, $opt_replyCallback_reply$$, $timeout$$), goog.global[goog.net.Jsonp.CALLBACKS][$id$$] = $opt_replyCallback_reply$$, $error$$3_opt_errorCallback$$7_uri$$.setParameterValues(this.callbackParamName_, goog.net.Jsonp.CALLBACKS + "." + $id$$));
  goog.dom.setProperties($script$$, {type:"text/javascript", id:$id$$, charset:"UTF-8", src:$error$$3_opt_errorCallback$$7_uri$$.toString()});
  goog.dom.appendChild(document.getElementsByTagName("head")[0], $script$$);
  return{id_:$id$$, timeout_:$timeout$$}
};
goog.net.Jsonp.prototype.cancel = function $goog$net$Jsonp$$cancel$($request$$) {
  if($request$$ && $request$$.id_) {
    var $scriptNode$$ = goog.dom.getElement($request$$.id_);
    $scriptNode$$ && ("SCRIPT" == $scriptNode$$.tagName && "function" == typeof goog.global[goog.net.Jsonp.CALLBACKS][$request$$.id_]) && ($request$$.timeout_ && goog.global.clearTimeout($request$$.timeout_), goog.net.Jsonp.cleanup_($request$$.id_, $scriptNode$$, !1))
  }
};
goog.net.Jsonp.newErrorHandler_ = function $goog$net$Jsonp$newErrorHandler_$($id$$, $scriptNode$$, $payload$$, $opt_errorCallback$$) {
  return function() {
    goog.net.Jsonp.cleanup_($id$$, $scriptNode$$, !1);
    $opt_errorCallback$$ && $opt_errorCallback$$($payload$$)
  }
};
goog.net.Jsonp.newReplyHandler_ = function $goog$net$Jsonp$newReplyHandler_$($id$$, $scriptNode$$, $replyCallback$$, $timeout$$) {
  return function($var_args$$) {
    goog.global.clearTimeout($timeout$$);
    goog.net.Jsonp.cleanup_($id$$, $scriptNode$$, !0);
    $replyCallback$$.apply(void 0, arguments)
  }
};
goog.net.Jsonp.cleanup_ = function $goog$net$Jsonp$cleanup_$($id$$, $scriptNode$$, $deleteReplyHandler$$) {
  goog.global.setTimeout(function() {
    goog.dom.removeNode($scriptNode$$)
  }, 0);
  goog.global[goog.net.Jsonp.CALLBACKS][$id$$] && ($deleteReplyHandler$$ ? delete goog.global[goog.net.Jsonp.CALLBACKS][$id$$] : goog.global[goog.net.Jsonp.CALLBACKS][$id$$] = goog.nullFunction)
};
goog.net.Jsonp.addPayloadToUri_ = function $goog$net$Jsonp$addPayloadToUri_$($payload$$, $uri$$) {
  for(var $name$$ in $payload$$) {
    (!$payload$$.hasOwnProperty || $payload$$.hasOwnProperty($name$$)) && $uri$$.setParameterValues($name$$, $payload$$[$name$$])
  }
  return $uri$$
};
goog.json = {};
goog.json.isValid_ = function $goog$json$isValid_$($s$$) {
  return/^\s*$/.test($s$$) ? !1 : /^[\],:{}\s\u2028\u2029]*$/.test($s$$.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x10-\x1f\x80-\x9f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""))
};
goog.json.parse = function $goog$json$parse$($o_s$$) {
  $o_s$$ = String($o_s$$);
  if(goog.json.isValid_($o_s$$)) {
    try {
      return eval("(" + $o_s$$ + ")")
    }catch($ex$$) {
    }
  }
  throw Error("Invalid JSON string: " + $o_s$$);
};
goog.json.unsafeParse = function $goog$json$unsafeParse$($s$$) {
  return eval("(" + $s$$ + ")")
};
goog.json.serialize = function $goog$json$serialize$($object$$, $opt_replacer$$) {
  return(new goog.json.Serializer($opt_replacer$$)).serialize($object$$)
};
goog.json.Serializer = function $goog$json$Serializer$($opt_replacer$$) {
  this.replacer_ = $opt_replacer$$
};
goog.json.Serializer.prototype.serialize = function $goog$json$Serializer$$serialize$($object$$) {
  var $sb$$ = [];
  this.serialize_($object$$, $sb$$);
  return $sb$$.join("")
};
goog.json.Serializer.prototype.serialize_ = function $goog$json$Serializer$$serialize_$($object$$, $sb$$) {
  switch(typeof $object$$) {
    case "string":
      this.serializeString_($object$$, $sb$$);
      break;
    case "number":
      this.serializeNumber_($object$$, $sb$$);
      break;
    case "boolean":
      $sb$$.push($object$$);
      break;
    case "undefined":
      $sb$$.push("null");
      break;
    case "object":
      if(null == $object$$) {
        $sb$$.push("null");
        break
      }
      if(goog.isArray($object$$)) {
        this.serializeArray_($object$$, $sb$$);
        break
      }
      this.serializeObject_($object$$, $sb$$);
      break;
    case "function":
      break;
    default:
      throw Error("Unknown type: " + typeof $object$$);
  }
};
goog.json.Serializer.charToJsonCharCache_ = {'"':'\\"', "\\":"\\\\", "/":"\\/", "\b":"\\b", "\f":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\x0B":"\\u000b"};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function $goog$json$Serializer$$serializeString_$($s$$, $sb$$) {
  $sb$$.push('"', $s$$.replace(goog.json.Serializer.charsToReplace_, function($c$$) {
    if($c$$ in goog.json.Serializer.charToJsonCharCache_) {
      return goog.json.Serializer.charToJsonCharCache_[$c$$]
    }
    var $cc$$ = $c$$.charCodeAt(0), $rv$$ = "\\u";
    16 > $cc$$ ? $rv$$ += "000" : 256 > $cc$$ ? $rv$$ += "00" : 4096 > $cc$$ && ($rv$$ += "0");
    return goog.json.Serializer.charToJsonCharCache_[$c$$] = $rv$$ + $cc$$.toString(16)
  }), '"')
};
goog.json.Serializer.prototype.serializeNumber_ = function $goog$json$Serializer$$serializeNumber_$($n$$, $sb$$) {
  $sb$$.push(isFinite($n$$) && !isNaN($n$$) ? $n$$ : "null")
};
goog.json.Serializer.prototype.serializeArray_ = function $goog$json$Serializer$$serializeArray_$($arr$$, $sb$$) {
  var $l$$ = $arr$$.length;
  $sb$$.push("[");
  for(var $sep_value$$ = "", $i$$ = 0;$i$$ < $l$$;$i$$++) {
    $sb$$.push($sep_value$$), $sep_value$$ = $arr$$[$i$$], this.serialize_(this.replacer_ ? this.replacer_.call($arr$$, String($i$$), $sep_value$$) : $sep_value$$, $sb$$), $sep_value$$ = ","
  }
  $sb$$.push("]")
};
goog.json.Serializer.prototype.serializeObject_ = function $goog$json$Serializer$$serializeObject_$($obj$$, $sb$$) {
  $sb$$.push("{");
  var $sep$$ = "", $key$$;
  for($key$$ in $obj$$) {
    if(Object.prototype.hasOwnProperty.call($obj$$, $key$$)) {
      var $value$$ = $obj$$[$key$$];
      "function" != typeof $value$$ && ($sb$$.push($sep$$), this.serializeString_($key$$, $sb$$), $sb$$.push(":"), this.serialize_(this.replacer_ ? this.replacer_.call($obj$$, $key$$, $value$$) : $value$$, $sb$$), $sep$$ = ",")
    }
  }
  $sb$$.push("}")
};
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_CAMINO = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_CAMINO || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.init_ = function $goog$userAgent$product$init_$() {
  goog.userAgent.product.detectedFirefox_ = !1;
  goog.userAgent.product.detectedCamino_ = !1;
  goog.userAgent.product.detectedIphone_ = !1;
  goog.userAgent.product.detectedIpad_ = !1;
  goog.userAgent.product.detectedAndroid_ = !1;
  goog.userAgent.product.detectedChrome_ = !1;
  goog.userAgent.product.detectedSafari_ = !1;
  var $ua$$ = goog.userAgent.getUserAgentString();
  $ua$$ && (-1 != $ua$$.indexOf("Firefox") ? goog.userAgent.product.detectedFirefox_ = !0 : -1 != $ua$$.indexOf("Camino") ? goog.userAgent.product.detectedCamino_ = !0 : -1 != $ua$$.indexOf("iPhone") || -1 != $ua$$.indexOf("iPod") ? goog.userAgent.product.detectedIphone_ = !0 : -1 != $ua$$.indexOf("iPad") ? goog.userAgent.product.detectedIpad_ = !0 : -1 != $ua$$.indexOf("Android") ? goog.userAgent.product.detectedAndroid_ = !0 : -1 != $ua$$.indexOf("Chrome") ? goog.userAgent.product.detectedChrome_ = 
  !0 : -1 != $ua$$.indexOf("Safari") && (goog.userAgent.product.detectedSafari_ = !0))
};
goog.userAgent.product.PRODUCT_KNOWN_ || goog.userAgent.product.init_();
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.userAgent.product.detectedFirefox_;
goog.userAgent.product.CAMINO = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CAMINO : goog.userAgent.product.detectedCamino_;
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.detectedIphone_;
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.userAgent.product.detectedIpad_;
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.userAgent.product.detectedAndroid_;
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.userAgent.product.detectedChrome_;
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.detectedSafari_;
goog.crypt = {};
goog.crypt.stringToByteArray = function $goog$crypt$stringToByteArray$($str$$) {
  for(var $output$$ = [], $p$$ = 0, $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    for(var $c$$ = $str$$.charCodeAt($i$$);255 < $c$$;) {
      $output$$[$p$$++] = $c$$ & 255, $c$$ >>= 8
    }
    $output$$[$p$$++] = $c$$
  }
  return $output$$
};
goog.crypt.byteArrayToString = function $goog$crypt$byteArrayToString$($array$$) {
  return String.fromCharCode.apply(null, $array$$)
};
goog.crypt.byteArrayToHex = function $goog$crypt$byteArrayToHex$($array$$) {
  return goog.array.map($array$$, function($hexByte_numByte$$) {
    $hexByte_numByte$$ = $hexByte_numByte$$.toString(16);
    return 1 < $hexByte_numByte$$.length ? $hexByte_numByte$$ : "0" + $hexByte_numByte$$
  }).join("")
};
goog.crypt.stringToUtf8ByteArray = function $goog$crypt$stringToUtf8ByteArray$($str$$) {
  for(var $str$$ = $str$$.replace(/\r\n/g, "\n"), $out$$ = [], $p$$ = 0, $i$$ = 0;$i$$ < $str$$.length;$i$$++) {
    var $c$$ = $str$$.charCodeAt($i$$);
    128 > $c$$ ? $out$$[$p$$++] = $c$$ : (2048 > $c$$ ? $out$$[$p$$++] = $c$$ >> 6 | 192 : ($out$$[$p$$++] = $c$$ >> 12 | 224, $out$$[$p$$++] = $c$$ >> 6 & 63 | 128), $out$$[$p$$++] = $c$$ & 63 | 128)
  }
  return $out$$
};
goog.crypt.utf8ByteArrayToString = function $goog$crypt$utf8ByteArrayToString$($bytes$$) {
  for(var $out$$ = [], $pos$$ = 0, $c$$ = 0;$pos$$ < $bytes$$.length;) {
    var $c1$$ = $bytes$$[$pos$$++];
    if(128 > $c1$$) {
      $out$$[$c$$++] = String.fromCharCode($c1$$)
    }else {
      if(191 < $c1$$ && 224 > $c1$$) {
        var $c2$$ = $bytes$$[$pos$$++];
        $out$$[$c$$++] = String.fromCharCode(($c1$$ & 31) << 6 | $c2$$ & 63)
      }else {
        var $c2$$ = $bytes$$[$pos$$++], $c3$$ = $bytes$$[$pos$$++];
        $out$$[$c$$++] = String.fromCharCode(($c1$$ & 15) << 12 | ($c2$$ & 63) << 6 | $c3$$ & 63)
      }
    }
  }
  return $out$$.join("")
};
goog.crypt.base64 = {};
goog.crypt.base64.byteToCharMap_ = null;
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.byteToCharMapWebSafe_ = null;
goog.crypt.base64.charToByteMapWebSafe_ = null;
goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
goog.crypt.base64.HAS_NATIVE_SUPPORT = goog.userAgent.GECKO || goog.userAgent.WEBKIT || goog.userAgent.OPERA || "function" == typeof goog.global.atob;
goog.crypt.base64.encodeByteArray = function $goog$crypt$base64$encodeByteArray$($input$$, $opt_webSafe$$) {
  if(!goog.isArrayLike($input$$)) {
    throw Error("encodeByteArray takes an array as a parameter");
  }
  goog.crypt.base64.init_();
  for(var $byteToCharMap$$ = $opt_webSafe$$ ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_, $output$$ = [], $i$$ = 0;$i$$ < $input$$.length;$i$$ += 3) {
    var $byte1_outByte2$$ = $input$$[$i$$], $haveByte2$$ = $i$$ + 1 < $input$$.length, $byte2_outByte3$$ = $haveByte2$$ ? $input$$[$i$$ + 1] : 0, $haveByte3$$ = $i$$ + 2 < $input$$.length, $byte3_outByte4$$ = $haveByte3$$ ? $input$$[$i$$ + 2] : 0, $outByte1$$ = $byte1_outByte2$$ >> 2, $byte1_outByte2$$ = ($byte1_outByte2$$ & 3) << 4 | $byte2_outByte3$$ >> 4, $byte2_outByte3$$ = ($byte2_outByte3$$ & 15) << 2 | $byte3_outByte4$$ >> 6, $byte3_outByte4$$ = $byte3_outByte4$$ & 63;
    $haveByte3$$ || ($byte3_outByte4$$ = 64, $haveByte2$$ || ($byte2_outByte3$$ = 64));
    $output$$.push($byteToCharMap$$[$outByte1$$], $byteToCharMap$$[$byte1_outByte2$$], $byteToCharMap$$[$byte2_outByte3$$], $byteToCharMap$$[$byte3_outByte4$$])
  }
  return $output$$.join("")
};
goog.crypt.base64.encodeString = function $goog$crypt$base64$encodeString$($input$$, $opt_webSafe$$) {
  return goog.crypt.base64.HAS_NATIVE_SUPPORT && !$opt_webSafe$$ ? goog.global.btoa($input$$) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray($input$$), $opt_webSafe$$)
};
goog.crypt.base64.decodeString = function $goog$crypt$base64$decodeString$($input$$, $opt_webSafe$$) {
  return goog.crypt.base64.HAS_NATIVE_SUPPORT && !$opt_webSafe$$ ? goog.global.atob($input$$) : goog.crypt.byteArrayToString(goog.crypt.base64.decodeStringToByteArray($input$$, $opt_webSafe$$))
};
goog.crypt.base64.decodeStringToByteArray = function $goog$crypt$base64$decodeStringToByteArray$($input$$, $opt_webSafe$$) {
  goog.crypt.base64.init_();
  for(var $charToByteMap$$ = $opt_webSafe$$ ? goog.crypt.base64.charToByteMapWebSafe_ : goog.crypt.base64.charToByteMap_, $output$$ = [], $i$$ = 0;$i$$ < $input$$.length;) {
    var $byte1$$ = $charToByteMap$$[$input$$.charAt($i$$++)], $byte2$$ = $i$$ < $input$$.length ? $charToByteMap$$[$input$$.charAt($i$$)] : 0;
    ++$i$$;
    var $byte3$$ = $i$$ < $input$$.length ? $charToByteMap$$[$input$$.charAt($i$$)] : 0;
    ++$i$$;
    var $byte4$$ = $i$$ < $input$$.length ? $charToByteMap$$[$input$$.charAt($i$$)] : 0;
    ++$i$$;
    if(null == $byte1$$ || null == $byte2$$ || null == $byte3$$ || null == $byte4$$) {
      throw Error();
    }
    $output$$.push($byte1$$ << 2 | $byte2$$ >> 4);
    64 != $byte3$$ && ($output$$.push($byte2$$ << 4 & 240 | $byte3$$ >> 2), 64 != $byte4$$ && $output$$.push($byte3$$ << 6 & 192 | $byte4$$))
  }
  return $output$$
};
goog.crypt.base64.init_ = function $goog$crypt$base64$init_$() {
  if(!goog.crypt.base64.byteToCharMap_) {
    goog.crypt.base64.byteToCharMap_ = {};
    goog.crypt.base64.charToByteMap_ = {};
    goog.crypt.base64.byteToCharMapWebSafe_ = {};
    goog.crypt.base64.charToByteMapWebSafe_ = {};
    for(var $i$$ = 0;$i$$ < goog.crypt.base64.ENCODED_VALS.length;$i$$++) {
      goog.crypt.base64.byteToCharMap_[$i$$] = goog.crypt.base64.ENCODED_VALS.charAt($i$$), goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[$i$$]] = $i$$, goog.crypt.base64.byteToCharMapWebSafe_[$i$$] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt($i$$), goog.crypt.base64.charToByteMapWebSafe_[goog.crypt.base64.byteToCharMapWebSafe_[$i$$]] = $i$$
    }
  }
};
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
goog.async = {};
goog.async.Deferred = function $goog$async$Deferred$($opt_canceller$$, $opt_defaultScope$$) {
  this.chain_ = [];
  this.canceller_ = $opt_canceller$$;
  this.defaultScope_ = $opt_defaultScope$$ || null
};
goog.async.Deferred.prototype.fired_ = !1;
goog.async.Deferred.prototype.hadError_ = !1;
goog.async.Deferred.prototype.paused_ = 0;
goog.async.Deferred.prototype.silentlyCancelled_ = !1;
goog.async.Deferred.prototype.chained_ = !1;
goog.async.Deferred.prototype.branches_ = 0;
goog.async.Deferred.prototype.cancel = function $goog$async$Deferred$$cancel$($opt_deepCancel$$) {
  if(this.hasFired()) {
    this.result_ instanceof goog.async.Deferred && this.result_.cancel()
  }else {
    if(this.parent_) {
      var $parent$$ = this.parent_;
      delete this.parent_;
      $opt_deepCancel$$ ? $parent$$.cancel($opt_deepCancel$$) : $parent$$.branchCancel_()
    }
    this.canceller_ ? this.canceller_.call(this.defaultScope_, this) : this.silentlyCancelled_ = !0;
    this.hasFired() || this.errback(new goog.async.Deferred.CancelledError(this))
  }
};
goog.async.Deferred.prototype.branchCancel_ = function $goog$async$Deferred$$branchCancel_$() {
  this.branches_--;
  0 >= this.branches_ && this.cancel()
};
goog.async.Deferred.prototype.pause_ = function $goog$async$Deferred$$pause_$() {
  this.paused_++
};
goog.async.Deferred.prototype.unpause_ = function $goog$async$Deferred$$unpause_$() {
  this.paused_--;
  0 == this.paused_ && this.hasFired() && this.fire_()
};
goog.async.Deferred.prototype.continue_ = function $goog$async$Deferred$$continue_$($isSuccess$$, $res$$) {
  this.resback_($isSuccess$$, $res$$);
  this.unpause_()
};
goog.async.Deferred.prototype.resback_ = function $goog$async$Deferred$$resback_$($isSuccess$$, $res$$) {
  this.fired_ = !0;
  this.result_ = $res$$;
  this.hadError_ = !$isSuccess$$;
  this.fire_()
};
goog.async.Deferred.prototype.check_ = function $goog$async$Deferred$$check_$() {
  if(this.hasFired()) {
    if(!this.silentlyCancelled_) {
      throw new goog.async.Deferred.AlreadyCalledError(this);
    }
    this.silentlyCancelled_ = !1
  }
};
goog.async.Deferred.prototype.callback = function $goog$async$Deferred$$callback$($result$$) {
  this.check_();
  this.assertNotDeferred_($result$$);
  this.resback_(!0, $result$$)
};
goog.async.Deferred.prototype.errback = function $goog$async$Deferred$$errback$($result$$) {
  this.check_();
  this.assertNotDeferred_($result$$);
  this.resback_(!1, $result$$)
};
goog.async.Deferred.prototype.assertNotDeferred_ = function $goog$async$Deferred$$assertNotDeferred_$($obj$$) {
  goog.asserts.assert(!($obj$$ instanceof goog.async.Deferred), "Deferred instances can only be chained if they are the result of a callback")
};
goog.async.Deferred.prototype.addCallback = function $goog$async$Deferred$$addCallback$($cb$$, $opt_scope$$) {
  return this.addCallbacks($cb$$, null, $opt_scope$$)
};
goog.async.Deferred.prototype.addErrback = function $goog$async$Deferred$$addErrback$($eb$$, $opt_scope$$) {
  return this.addCallbacks(null, $eb$$, $opt_scope$$)
};
goog.async.Deferred.prototype.addCallbacks = function $goog$async$Deferred$$addCallbacks$($cb$$, $eb$$, $opt_scope$$) {
  goog.asserts.assert(!this.chained_, "Chained Deferreds can not be re-used");
  this.chain_.push([$cb$$, $eb$$, $opt_scope$$]);
  this.hasFired() && this.fire_();
  return this
};
goog.async.Deferred.prototype.chainDeferred = function $goog$async$Deferred$$chainDeferred$($otherDeferred$$) {
  this.addCallbacks($otherDeferred$$.callback, $otherDeferred$$.errback, $otherDeferred$$);
  return this
};
goog.async.Deferred.prototype.awaitDeferred = function $goog$async$Deferred$$awaitDeferred$($otherDeferred$$) {
  return this.addCallback(goog.bind($otherDeferred$$.branch, $otherDeferred$$))
};
goog.async.Deferred.prototype.branch = function $goog$async$Deferred$$branch$($opt_propagateCancel$$) {
  var $d$$ = new goog.async.Deferred;
  this.chainDeferred($d$$);
  $opt_propagateCancel$$ && ($d$$.parent_ = this, this.branches_++);
  return $d$$
};
goog.async.Deferred.prototype.addBoth = function $goog$async$Deferred$$addBoth$($f$$, $opt_scope$$) {
  return this.addCallbacks($f$$, $f$$, $opt_scope$$)
};
goog.async.Deferred.prototype.hasFired = function $goog$async$Deferred$$hasFired$() {
  return this.fired_
};
goog.async.Deferred.prototype.isError = function $goog$async$Deferred$$isError$($res$$) {
  return $res$$ instanceof Error
};
goog.async.Deferred.prototype.hasErrback_ = function $goog$async$Deferred$$hasErrback_$() {
  return goog.array.some(this.chain_, function($chainRow$$) {
    return goog.isFunction($chainRow$$[1])
  })
};
goog.async.Deferred.prototype.fire_ = function $goog$async$Deferred$$fire_$() {
  this.unhandledExceptionTimeoutId_ && (this.hasFired() && this.hasErrback_()) && (goog.global.clearTimeout(this.unhandledExceptionTimeoutId_), delete this.unhandledExceptionTimeoutId_);
  this.parent_ && (this.parent_.branches_--, delete this.parent_);
  for(var $res$$ = this.result_, $unhandledException$$ = !1, $isChained$$ = !1;this.chain_.length && 0 == this.paused_;) {
    var $chainEntry_scope$$ = this.chain_.shift(), $callback$$32_f$$ = $chainEntry_scope$$[0], $errback$$ = $chainEntry_scope$$[1], $chainEntry_scope$$ = $chainEntry_scope$$[2];
    if($callback$$32_f$$ = this.hadError_ ? $errback$$ : $callback$$32_f$$) {
      try {
        var $ret$$ = $callback$$32_f$$.call($chainEntry_scope$$ || this.defaultScope_, $res$$);
        goog.isDef($ret$$) && (this.hadError_ = this.hadError_ && ($ret$$ == $res$$ || this.isError($ret$$)), this.result_ = $res$$ = $ret$$);
        $res$$ instanceof goog.async.Deferred && ($isChained$$ = !0, this.pause_())
      }catch($ex$$) {
        $res$$ = $ex$$, this.hadError_ = !0, this.hasErrback_() || ($unhandledException$$ = !0)
      }
    }
  }
  this.result_ = $res$$;
  $isChained$$ && this.paused_ && ($res$$.addCallbacks(goog.bind(this.continue_, this, !0), goog.bind(this.continue_, this, !1)), $res$$.chained_ = !0);
  $unhandledException$$ && (this.unhandledExceptionTimeoutId_ = goog.global.setTimeout(function() {
    if(goog.DEBUG && goog.isDef($res$$.message) && $res$$.stack) {
      $res$$.message = $res$$.message + ("\n" + $res$$.stack)
    }
    throw $res$$;
  }, 0))
};
goog.async.Deferred.succeed = function $goog$async$Deferred$succeed$($res$$) {
  var $d$$ = new goog.async.Deferred;
  $d$$.callback($res$$);
  return $d$$
};
goog.async.Deferred.fail = function $goog$async$Deferred$fail$($res$$) {
  var $d$$ = new goog.async.Deferred;
  $d$$.errback($res$$);
  return $d$$
};
goog.async.Deferred.AlreadyCalledError = function $goog$async$Deferred$AlreadyCalledError$($deferred$$) {
  goog.debug.Error.call(this);
  this.deferred = $deferred$$
};
goog.inherits(goog.async.Deferred.AlreadyCalledError, goog.debug.Error);
goog.async.Deferred.AlreadyCalledError.prototype.message = "Already called";
goog.async.Deferred.CancelledError = function $goog$async$Deferred$CancelledError$($deferred$$) {
  goog.debug.Error.call(this);
  this.deferred = $deferred$$
};
goog.inherits(goog.async.Deferred.CancelledError, goog.debug.Error);
goog.async.Deferred.CancelledError.prototype.message = "Deferred was cancelled";
fyre.v1.async = {};
fyre.v1.async.DeferredInterface = function $fyre$v1$async$DeferredInterface$() {
  this.registry = {}
};
fyre.v1.async.DeferredInterface.prototype.factory = function $fyre$v1$async$DeferredInterface$$factory$($ctor$$) {
  var $uid$$ = goog.getUid($ctor$$ || function() {
  }), $registry$$ = this.registry, $ctor$$ = function $$ctor$$$() {
    this.args = goog.array.clone(arguments);
    goog.object.contains($registry$$, $uid$$) || ($registry$$[$uid$$] = []);
    $registry$$[$uid$$].push(this);
    this.backend = new goog.async.Deferred
  };
  $ctor$$.setBackend = goog.bind(this.setBackend, this, $uid$$);
  $ctor$$.deferredId = $uid$$;
  return $ctor$$
};
fyre.v1.async.DeferredInterface.prototype.setBackend = function $fyre$v1$async$DeferredInterface$$setBackend$($uid$$, $ctor$$) {
  this.registry[$uid$$] && goog.array.forEach(this.registry[$uid$$], function($deferred$$) {
    var $Delegate$$ = function $$Delegate$$$() {
      return $ctor$$.apply(this, $deferred$$.args)
    };
    $Delegate$$.prototype = $ctor$$.prototype;
    $deferred$$.backend.callback(new $Delegate$$)
  })
};
fyre.v1.async.deferredInterface = new fyre.v1.async.DeferredInterface;
fyre.conv.integration = {};
fyre.conv.LivefyreAuthDelegate = fyre.v1.async.deferredInterface.factory();
fyre.conv.LivefyreAuthDelegate.prototype.loginByCookie = function $fyre$conv$LivefyreAuthDelegate$$loginByCookie$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.loginByCookie($handler$$)
  })
};
fyre.conv.LivefyreAuthDelegate.prototype.logout = function $fyre$conv$LivefyreAuthDelegate$$logout$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.logout($handler$$)
  })
};
fyre.conv.LivefyreAuthDelegate.prototype.viewProfile = function $fyre$conv$LivefyreAuthDelegate$$viewProfile$($handler$$, $author$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.viewProfile($handler$$, $author$$)
  })
};
fyre.conv.LivefyreAuthDelegate.prototype.editProfile = function $fyre$conv$LivefyreAuthDelegate$$editProfile$($handler$$, $author$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.editProfile($handler$$, $author$$)
  })
};
fyre.conv.SPAuthDelegate = fyre.v1.async.deferredInterface.factory();
fyre.conv.SPAuthDelegate.prototype.login = function $fyre$conv$SPAuthDelegate$$login$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.login($handler$$)
  })
};
fyre.conv.SPAuthDelegate.prototype.loginByCookie = function $fyre$conv$SPAuthDelegate$$loginByCookie$($handler$$, $token$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.loginByCookie($handler$$, $token$$)
  })
};
fyre.conv.SPAuthDelegate.prototype.logout = function $fyre$conv$SPAuthDelegate$$logout$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.logout($handler$$)
  })
};
fyre.conv.SPAuthDelegate.prototype.viewProfile = function $fyre$conv$SPAuthDelegate$$viewProfile$($handler$$, $author$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.viewProfile($handler$$, $author$$)
  })
};
fyre.conv.SPAuthDelegate.prototype.editProfile = function $fyre$conv$SPAuthDelegate$$editProfile$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.editProfile($handler$$)
  })
};
fyre.conv.BackplaneAuthDelegate = fyre.v1.async.deferredInterface.factory();
fyre.conv.BackplaneAuthDelegate.prototype.login = function $fyre$conv$BackplaneAuthDelegate$$login$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.login($handler$$)
  })
};
fyre.conv.BackplaneAuthDelegate.prototype.logout = function $fyre$conv$BackplaneAuthDelegate$$logout$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.logout($handler$$)
  })
};
fyre.conv.BackplaneAuthDelegate.prototype.viewProfile = function $fyre$conv$BackplaneAuthDelegate$$viewProfile$($handler$$, $author$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.viewProfile($handler$$, $author$$)
  })
};
fyre.conv.BackplaneAuthDelegate.prototype.editProfile = function $fyre$conv$BackplaneAuthDelegate$$editProfile$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.editProfile($handler$$)
  })
};
fyre.conv.RemoteAuthDelegate = fyre.v1.async.deferredInterface.factory();
fyre.conv.RemoteAuthDelegate.prototype.loginByCookie = function $fyre$conv$RemoteAuthDelegate$$loginByCookie$($handler$$, $token$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.loginByCookie($handler$$, $token$$)
  })
};
fyre.conv.RemoteAuthDelegate.prototype.login = function $fyre$conv$RemoteAuthDelegate$$login$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.login($handler$$)
  })
};
fyre.conv.RemoteAuthDelegate.prototype.logout = function $fyre$conv$RemoteAuthDelegate$$logout$($handler$$) {
  this.backend.addCallback(function($backend$$) {
    $backend$$.logout($handler$$)
  })
};
fyre.conv.ready = function() {
  var $deferred$$ = new goog.async.Deferred, $ready$$ = function $$ready$$$($callback$$) {
    $deferred$$.addCallback($callback$$)
  };
  $ready$$.trigger = function $$ready$$$trigger$() {
    $deferred$$.callback()
  };
  return $ready$$
}();
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_=";
fyre.conv.load = function $fyre$conv$load$($FyreLoader$$, $apps$$, $callback$$) {
  if(window.FyreLoader) {
    throw"Livefyre is already loaded.";
  }
  $FyreLoader$$ = window.FyreLoader = new fyre.conv.Loader($FyreLoader$$, $apps$$, $callback$$);
  $FyreLoader$$.load();
  return $FyreLoader$$
};
goog.exportSymbol("fyre.conv.load", fyre.conv.load);
fyre.conv.Loader = function $fyre$conv$Loader$($opts$$, $apps$$, $callback$$) {
  var $cookieConfig$$ = goog.net.cookies.get("lf_config");
  goog.isString($cookieConfig$$) && goog.object.extend($opts$$, goog.json.parse($cookieConfig$$));
  $opts$$.network && fyre.conv.config.setNetwork($opts$$.network);
  this.opts = $opts$$;
  goog.isFunction($apps$$) && ($callback$$ = $apps$$, $apps$$ = fyre.conv.modules.DEFAULT);
  $apps$$ || ($apps$$ = fyre.conv.modules.DEFAULT);
  this.moduleNames = [];
  this.appConf = goog.array.map(goog.isString($apps$$) ? [$apps$$] : $apps$$, this.getAppConfig, this);
  this.appsPending = goog.array.clone($apps$$);
  this.apps = {};
  this.callback = $callback$$ || function() {
  }
};
fyre.conv.Loader.prototype.load = function $fyre$conv$Loader$$load$() {
  this.initPage(this.appConf[0].opts)
};
fyre.conv.Loader.EVENTS = fyre.conv.Loader.prototype.EVENTS = {PAGE_INITIALIZED:"pageInit", PAGE_INIT_RECV:"pageinitRecv"};
fyre.conv.Loader.prototype.getAppConfig = function $fyre$conv$Loader$$getAppConfig$($app_appConfig$$) {
  var $module$$;
  goog.isString($app_appConfig$$) ? $app_appConfig$$ = {appName:$app_appConfig$$, opts:{}} : ($app_appConfig$$ = {appName:$app_appConfig$$.app || fyre.conv.modules.DEFAULT, opts:goog.object.clone($app_appConfig$$)}, delete $app_appConfig$$.opts.app);
  $module$$ = fyre.conv.modules[$app_appConfig$$.appName];
  if(!$module$$) {
    throw"Invalid app " + $app_appConfig$$.appName;
  }
  $app_appConfig$$.module = $module$$;
  goog.array.binaryInsert(this.moduleNames, $app_appConfig$$.appName);
  return $app_appConfig$$
};
fyre.conv.Loader.prototype.initPage = function $fyre$conv$Loader$$initPage$() {
  this.handleVersion("10001")
};
fyre.conv.Loader.prototype.handleInit = function $fyre$conv$Loader$$handleInit$($data$$) {
  this.initData = $data$$;
  this.handleVersion($data$$.data.version)
};
fyre.conv.Loader.prototype.handleVersion = function $fyre$conv$Loader$$handleVersion$($version$$) {
  fyre.conv.config.assetVersion = $version$$;
  this.loadLivefyreCss();
  fyre.v1.util.ScriptLoader.loadScript(fyre.v1.config.assetUrl("javascripts/livefyre_" + this.moduleNames.join("_") + ".js"));
  this.timer = setTimeout(goog.bind(this.handleTimeout, this), 3E3)
};
fyre.conv.Loader.prototype.loadLivefyreCss = function $fyre$conv$Loader$$loadLivefyreCss$() {
  fyre.v1.util.ScriptLoader.loadCSS(fyre.v1.config.assetUrl("css/" + ("livefyre_" + (goog.userAgent.product.IPAD ? "ipad" : goog.userAgent.MOBILE || goog.userAgent.product.ANDROID ? "mobile" : "embed") + ".css")))
};
fyre.conv.Loader.prototype.getOpts = function $fyre$conv$Loader$$getOpts$($app$$) {
  var $opts$$ = goog.object.clone(this.opts);
  goog.object.extend($opts$$, $app$$.opts);
  return goog.object.filter($opts$$, function($value$$, $key$$) {
    return goog.array.contains($app$$.module.opts, $key$$)
  })
};
fyre.conv.Loader.prototype.initializeApp = function $fyre$conv$Loader$$initializeApp$($ctor$$) {
  var $appConf$$;
  window.clearTimeout(this.timer);
  goog.array.forEach(this.appConf, function($app$$, $idx$$) {
    $ctor$$.CONSTANTS.name === "fyre.conv.app." + $app$$.appName && ($appConf$$ = this.getOpts($app$$), goog.object.isEmpty(this.apps) && fyre.conv.initializeAuthService($appConf$$), $app$$ = new $ctor$$($appConf$$), this.initData && $app$$.context.trigger(this.EVENTS.PAGE_INIT_RECV, this.initData), this.apps[$idx$$] = $app$$)
  }, this);
  if(!(goog.object.getCount(this.apps) < this.appConf.length)) {
    this.initData || fyre.conv.bus.trigger(this.EVENTS.PAGE_INITIALIZED);
    var $appArray$$ = [];
    goog.object.forEach(this.apps, function($app$$, $idx$$) {
      $appArray$$.push(this.apps[$idx$$.toString()])
    }, this);
    this.callback.apply(window, $appArray$$);
    fyre.conv.ready.trigger()
  }
};
fyre.conv.Loader.prototype.handleTimeout = function $fyre$conv$Loader$$handleTimeout$() {
  goog.net.cookies.remove(fyre.conv.config.VERSION_COOKIE)
};
goog.isFunction(window.FYRE_LOADED_CB) && window.FYRE_LOADED_CB(fyre);
})(googol, fyre);
