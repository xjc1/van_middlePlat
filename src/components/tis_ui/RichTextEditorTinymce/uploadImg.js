/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-extraneous-dependencies */
import tinymce from 'tinymce/tinymce';


export default function (upladForm, eventEmitter) {

  tinymce.PluginManager.add('uploadImg', function (editor) {

    // 注册一个工具栏按钮名称
    editor.ui.registry.addButton('uploadImg', {
      text: '图片上传',
      onAction() {
        eventEmitter.removeAllListeners();
        upladForm?.current?.upload?.uploader?.fileInput?.click();
        eventEmitter.once('file', (path) => {
          if(path) {
            editor.execCommand(
              'mceInsertContent',
              false,
              `<img src="${path}" style="max-width: 100%"'/>`
            );
          }
        });
      }
    });

    return {
      getMetadata() {
        return {
          name: "uploadImg",
          url: "http://exampleplugindocsurl.com",
        };
      }
    };
  });

}
