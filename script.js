document.getElementById('upload').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const userImage = new Image();
        userImage.src = e.target.result;
        userImage.onload = function() {
            const canvas = document.getElementById('canvas');
            const context = canvas.getContext('2d');
            const userImageWidth = userImage.width;
            const userImageHeight = userImage.height;

            // 将canvas大小设置为用户上传图片的宽度和高度
            canvas.width = userImageWidth;
            canvas.height = userImageHeight;

            // 绘制用户上传的图片
            context.drawImage(userImage, 0, 0, userImageWidth, userImageHeight);

            // 加载叠加图片
            const overlayImage = new Image();
            overlayImage.src = 'overlay.png'; // 假设叠加图片名为overlay.png
            overlayImage.onload = function() {
                const overlayImageHeight = overlayImage.height * (userImageWidth / overlayImage.width);

                // 绘制叠加图片到用户图片的下半部分
                context.drawImage(overlayImage, 0, userImageHeight - overlayImageHeight, userImageWidth, overlayImageHeight);
            };

            overlayImage.onerror = function() {
                console.error('叠加图片加载失败，请检查路径是否正确');
            };
        };
    };
    reader.readAsDataURL(file);
    reader.onerror = function() {
        console.error('用户图片加载失败');
    };
});

document.getElementById('download').addEventListener('click', function() {
    const canvas = document.getElementById('canvas');
    const link = document.createElement('a');
    link.download = '我也要贺新春.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
