// ==UserScript==
// @name         ZJSU����
// @namespace    https://github.com/Zzzcy-tx/ZJSU_GetMyCoursePLZ
// @version      1.0
// @description  ���Ͱ���ָ�������ݵ�HTTP POST
// @author       Zzzcy
// @match        */jwglxt/*gnmkdm=N253512*
// @grant        unsafeWindow
// @license      MPL
// ==/UserScript==

var data1, route, responseData, stuNumber;
let draggableBox;
const qqNumber = '552241992'
let shouldCaptureFetch = false;

// ����ҳ��� XMLHttpRequest ����
const open = XMLHttpRequest.prototype.open;
const send = XMLHttpRequest.prototype.send;
const originalSend = XMLHttpRequest.prototype.send;

XMLHttpRequest.prototype.open = function (method, url) {
    //console.log(`yicibuhuo,method=${method}, data=${data}`)
    console.log(url, method);
    if (shouldCaptureFetch) {
        const parser = document.createElement('a');
        parser.href = url;
        stuNumber = url.substring(58,69);
        console.log(stuNumber);
    }
    // ����ԭʼ�� XMLHttpRequest ����
    return open.apply(this, arguments);
};

XMLHttpRequest.prototype.send = function (data) {
    console.log(data);
    if (shouldCaptureFetch) {
        data1 = data;
    }
    console.log(data1);
    originalSend.call(this, data);// ����ԭʼ�� XMLHttpRequest ����
};

// ����һ��Ԫ������ʾ����
const resultDiv = document.createElement('div');
document.body.appendChild(resultDiv);
resultDiv.textContent = '   �ȴ�������'

const lineBreak = document.createElement('br');
document.body.appendChild(lineBreak);

// ����һ�������󡱰�ť��һ����ֹͣ����ť
const requestButton = document.createElement('button');
requestButton.textContent = ' ���� POST ���� ';
document.body.appendChild(requestButton);
const stopButton = document.createElement('button');
stopButton.textContent = ' ֹͣ ';
document.body.appendChild(stopButton);

const recordButton = document.createElement('button');
recordButton.textContent = ' ¼��POST '
document.body.appendChild(recordButton);

document.body.appendChild(lineBreak);


// �����Ƿ����ڽ���
let isRequesting = false;

// �����󡱰�ť����¼��������
requestButton.addEventListener('click', () => {
  if (!isRequesting) {
    isRequesting = true;
    requestLoop();
  }
});
// ��ֹͣ����ť����¼��������
stopButton.addEventListener('click', () => {
    isRequesting = false;
    resultDiv.textContent = '�ȴ�������'
});

recordButton.addEventListener('click', () => {
    if(shouldCaptureFetch){
        shouldCaptureFetch = false
        resultDiv.textContent = 'δ��ʼ����POST'
    } else {
        shouldCaptureFetch = true
        resultDiv.textContent = '���ڼ���POST����'
    }
});


// ����һ������������POST����
async function sendPostRequest() {
  try {
      const data = data1;
      let xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      xhr.open('POST', `https://jwxt.zjgsu.edu.cn/jwglxt/xsxk/zzxkyzb_xkBcZyZzxkYzb.html?gnmkdm=N253512&su=${stuNumber}`);
      xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0');
      xhr.setRequestHeader('Accept', 'application/json, text/javascript, */*; q=0.01');
      xhr.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2');
      xhr.setRequestHeader('Accept-Encoding', 'gzip, deflate, br');
      xhr.setRequestHeader('Referer', `https://jwxt.zjgsu.edu.cn/jwglxt/xsxk/zzxkyzb_cxZzxkYzbIndex.html?gnmkdm=N253512&layout=default&su=${stuNumber}`);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.setRequestHeader('Origin', 'https://jwxt.zjgsu.edu.cn');
      xhr.setRequestHeader('DNT', '1');
      xhr.setRequestHeader('Connection', 'keep-alive');
      xhr.setRequestHeader('Cookie', `${route}`);
      xhr.setRequestHeader('Sec-Fetch-Dest', 'empty');
      xhr.setRequestHeader('Sec-Fetch-Mode', 'cors');
      xhr.setRequestHeader('Sec-Fetch-Site', 'same-origin');

      xhr.onload = await function() {
          responseData = xhr.response;
          console.log(xhr.response);
      };

      await xhr.send(data);
      var flag = JSON.parse(responseData).flag;
      console.log(flag);

      // ��JSON����ת��Ϊ�ַ�������ʾ��<div>Ԫ����
      if(flag === '-1'){
          resultDiv.textContent = '���ڵȴ������ų��������ĵȴ�����'
      } else if( flag === '0' ){
          resultDiv.textContent = '�ſ�ʱ���ͻ��δ��ȷ¼��POST����ˢ�½���'
      } else if( flag === '1' ){
          resultDiv.textContent = '���γɹ� \\^_^// '
      } else {
          resultDiv.textContent = `δ֪flag,����ϵ������ԱQQ:${qqNumber}`
      }
      //resultDiv.textContent = JSON.stringify(responseData, null, 2);
      // ���data.flag����1������ֹͣ��ť���£���ֹͣ����
      if (flag === '1' || flag === '0' || !isRequesting) {
          isRequesting = false;
      }
  } catch (error) {
    console.error('��������', error);
  }
};
// ����һ����������ʱ��������
async function requestLoop() {
    while (isRequesting) {
        await sendPostRequest();
        await sleep(1000);
        route = document.cookie;
    }
};
// sleep����
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
};


//��ʾ����
(function () {
    const style = document.createElement('style');
    style.textContent =
        `
        .grabclasscontainer {
            width: 320px;
            text-align: center;
            position: fixed;
            right: 0px;
            bottom: 0px;
            height: 350px;
            border: 2px #333 solid;
            background-color: #d5e8fc;
            z-index: 999;
        }

        .grabclasscontainer label {
            flex: 1;
            text-align: right;
            margin-right: 10px;
        }


        .grabclasscontainer .dragBar {
            height: 30px;
            line-height: 30px;
            background-color: #505860;
            cursor: move;
            margin-bottom: 9px;
        }

        .grabclasscontainer .content {
            overflow-y: auto;
            height: 309px;
        }

        .grabclasscontainer .dragBar {
            height: 30px;
            line-height: 30px;
            background-color: #07c160;
            cursor: move;
            margin-bottom: 9px;
        }

        .grabclasscontainer .copyright {
            text-align: left;
        }

        .grabclasscontainer .graberror {
            color: #e91a0b;
        }

        .grabclasscontainer .grabsuccess {
            color: #0be94e;
        }
        `
    
    
    document.head.appendChild(style);
    const grabclasscontainer = document.createElement('div');
    grabclasscontainer.className = 'grabclasscontainer';
    grabclasscontainer.id = 'grabclasscontainer';
    grabclasscontainer.innerHTML = `
        <div class="dragBar" id="dragBar">
            ��ס�϶�
        </div>
        <div class="content">
            <div class="copyright">
                ��ʹ�÷�ʽ��<br>
                1.�㿪����Ҫ�ĿΣ�ȷ����ε�ʱ���û�г�ͻ��<br>
                2.��������ҳ���·��������¼��POST����Ȼ����ұߵġ�ѡ�Ρ�<br>
                3.�м�ᵯ����ʾ����������������ѡ������ʾ����ȷ����<br>
                4.���ŵ����ҳ���·��ġ�����POST���󡱣��۲찴ť�Ϸ���ʾ�������ڵȴ������ų��������ĵȴ���������Ϊ����<br>
                5.��Ҫ�ر���ҳ����Ҫ�رյ��ԣ���ð���ҳ��󻯣��ȴ����γɹ���<br><br><br>
                ����ϵ���ߡ��г�������QQ��${qqNumber}<br>
            </div>
        </div>
        `
    
    document.body.appendChild(grabclasscontainer);
    draggableBox = document.getElementById("grabclasscontainer");
    const dragBar = draggableBox.querySelector(".dragBar");
    let isDragging = false;
    let offsetX, offsetY;
    
    //EventTarget Listeners
    dragBar.addEventListener("mousedown", (e) => {
        isDragging = true;
        offsetX = e.clientX - draggableBox.getBoundingClientRect().left;
        offsetY = e.clientY - draggableBox.getBoundingClientRect().top;
        draggableBox.style.transition = "none";
    });
    document.addEventListener("mousemove", (e) => {
        if (!isDragging) return;
        let x = e.clientX - offsetX;
        let y = e.clientY - offsetY;
        draggableBox.style.left = x + "px";
        draggableBox.style.top = y + "px";
    });
    document.addEventListener("mouseup", () => {
        isDragging = false;
        draggableBox.style.transition = "all 0.3s ease"; // ���ƽ���Ĺ���Ч��
    });
    draggableBox.querySelector('.clear').addEventListener('click', () => {
        localStorage.removeItem('targetTeacher');
        localStorage.removeItem('targetTime');
        localStorage.removeItem('firstmenu');
        localStorage.removeItem('secondmenu');
    });
})();


