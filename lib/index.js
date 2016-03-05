'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (babel){
  var remap = new _HelperRemap.HelperRemap(babel);
  return {
    pre: function pre(file){
      remap.helperFilename = this.opts.helperFilename;
      var sourcePath = file.opts.filename,
        helperAbsPath = remap.helperAbsPath,
        relativePath = undefined;
      if (sourcePath !== helperAbsPath) {
        relativePath = (0, _HelperRemap.getRelativePath)(sourcePath, helperAbsPath);
        file.set('helperGenerator', remap.helperFactory(relativePath));
      }
    },
    post: function post(){
      if (remap.shouldRewriteTempFile) {
        remap.writeHelperFile(remap.helperAbsPath);
        remap._invalidTempFile = false;
      }
    },

    visitor: {
      Program: {
        exit: function exit(path){
          if (remap.isHelperFile(this.file.opts.filename)) {
            path.pushContainer('body', remap.getUsedMethods());
          }
        }
      }
    }
  };
};

var _HelperRemap = require('./HelperRemap');