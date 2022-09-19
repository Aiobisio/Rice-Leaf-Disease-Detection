import io
import base64
from yolo import YOLO
from PIL import Image
from flask import Flask, jsonify, request

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def detect():
    if request.method != "POST":
        return jsonify({"code": 2, "msg": "the request method is error!", "data": {"isSecret": "null"}})
    if request.files.get("image"):
        img_file = request.files["image"]
        img_bytes = img_file.read()
        img = Image.open(io.BytesIO(img_bytes))
        img.save("img.jpg")
    yolo = YOLO()
    while True:
        img = "img.jpg"
        try:
            image = Image.open(img)
        except:
            print("error!")
            continue
        else:
            r_image = yolo.detect_image(image, crop=False, count=False)
            r_image.save("result.jpg")
        img_res = ''
        with open("result.jpg", 'rb') as f:
            img_res = f.read()
            img_res = base64.b64encode(img_res)
        return jsonify({"data": {"detect_res": "yes", "image": str(img_res, 'utf-8')}})


if __name__ == '__main__':
    app.run(host="192.168.237.135", debug=True, port=8080)
