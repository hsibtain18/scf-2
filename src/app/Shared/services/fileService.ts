import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FileService {



    public fileEvent(event): any {

        var fileObjDetail: any = {};
    
    
        let file = event.target.files[0];
    
    
        let start = 0;
        let stop = file.size - 1;
    
        let reader: FileReader = new FileReader();
        let blob = file.slice(start, stop + 1);
    
    
        reader.readAsDataURL(blob);
        // //reader.readAsDataURL(file);
        let byteArray: any = new Array();
    
        // let self = this;
        reader.onloadend = function (evt: any) {
    
    
    
    
    
          let str: any = reader.result;
    
          let bytesString = "";
    
          let spl = str.substring(str.indexOf(",") + 1, str.length);
          bytesString = window.atob(spl);
          for (let i = 0; i < bytesString.length; i++) {
            byteArray.push(bytesString.charCodeAt(i));
          }
    
        }
    
    
        fileObjDetail.FileData = byteArray;
    
    
    
        let extension = file.name.split(".");
    
        if (extension.length > 0)
          fileObjDetail.FileExtension = extension[1];
    
        fileObjDetail.FileType = file.type;
        fileObjDetail.FileName = file.name.split('.')[0];
    
        return fileObjDetail;
      }

}