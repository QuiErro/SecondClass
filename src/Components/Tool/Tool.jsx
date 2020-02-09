class Tool {
    // 1. 生成图片Base64编码
    fileToBase64Url(file, callback){
        // 1.1 修改图片的信息
        let src = '';
        const reader = new FileReader();
        if(file){
            reader.readAsDataURL(file);
        }
        // 1.2 阅读器已经解析完毕
        reader.onloadend = ()=>{
            src = reader.result;
            // 回调返回
            callback && callback(src);
        }
    }

    // 2. 设置本地缓存
    setStore(name, content){
        let tempObj = JSON.parse(window.localStorage.getItem(name)) || {};
        Object.keys(content).forEach((key)=>{
            tempObj[key] = content[key];
        });
        window.localStorage.setItem(name, JSON.stringify(tempObj));
    }

    // 3. 获取本地缓存
    getStore(name){
        return JSON.parse(window.localStorage.getItem(name));
    }

    // 4. 删除本地缓存
    removeStore(name){
        window.localStorage.removeItem(name);
    }
}

export default Tool;