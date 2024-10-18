chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     if (request.action === "releaseKoshochka") {
         releaseTheKoshochka(request.color);
     }
});

chrome.storage.local.get(['showKoshochka', 'koshochkaColor'], function(result) {
     if (result.showKoshochka) {
         const colorToUse = result.koshochkaColor || 'color-0-0';
         releaseTheKoshochka(colorToUse);
     }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
     if (request.action === "hideKoshochka") {
         hideTheKoshochka();
     }
});

chrome.storage.local.get(['showKoshochka'], function(result) {
     if (!result.showKoshochka) {
         hideTheKoshochka();
     }
});

function hideTheKoshochka() {
     let existingKoshochka = document.querySelectorAll('.koshochka-widget-wrapper');
     existingKoshochka.forEach(koshochka => koshochka.remove());
}

function releaseTheKoshochka(color) {
     let existingKoshochka = document.querySelectorAll('.koshochka-widget-wrapper');
     let colorArr = color.split('-');
     let selectedColorH = colorArr[1];
     let selectedColorS = colorArr[2] + '%';

     if (existingKoshochka.length == 0) {
          let style = document.createElement('style');
          style.innerHTML = `
               :root {
                    --base-color-h: ` + selectedColorH + `;
                    --base-color-s: ` + selectedColorS + `;
                    --base-color-l-dark: 20%;
                    --base-color-l-light: 80%;
               }
               .koshochka-widget-wrapper {
                    position: fixed;
                    bottom: 0;
                    width: 100vw;
                    overflow: hidden;
                    pointer-events: none;
                    z-index: calc(infinity);           
               }
               .koshochka-widget-container {
                    width: 100%;
                    height: 100%;
                    position: relative;
                    animation: shake 0.25s infinite linear;
               }
               .koshochka-widget-inner {
                    width: 200px;
                    height: 200px;
                    display: none;
                    position: relative;
                    filter: drop-shadow(30px 20px 4px rgba(0, 0, 0, 0.2));
               }
               .koshochka-widget-body {
                    width: 120px;
                    height: 40px;
                    border-radius: 10px;
                    position: absolute;
                    bottom: 30px;
                    left: 50%;
                    transform: translateX(-50%);
               }
               .koshochka-widget-head {
                    width: 45px;
                    height: 45px;
                    border-radius: 45px;
                    position: absolute;
                    bottom: 50px;
                    background: radial-gradient(ellipse at top left, rgb(195, 195, 195), rgb(28, 28, 28));
               }
               .koshochka-widget-head::before {
                    content: '';
                    transform: scaleY(2) rotate(45deg);
                    background: linear-gradient(135deg, rgb(195, 195, 195), rgb(28, 28, 28));
                    position: absolute;
                    top: -2px;
                    width: 16px;
                    height: 16px;
                    z-index: -1;
                    border-radius: 4px;
                    border: 1px solid rgb(90, 90, 90);
               }
               .koshochka-widget-head::after {
                    content: '';
                    transform: scaleY(2) rotate(45deg);
                    background: linear-gradient(135deg, rgb(195, 195, 195), rgb(28, 28, 28));
                    position: absolute;
                    top: -2px;
                    width: 16px;
                    height: 16px;
                    z-index: -1;
                    border-radius: 4px;
                    border: 1px solid rgb(90, 90, 90);
               }
               .koshochka-widget-animated-right .koshochka-widget-head {
                    right: 15px;
               }
               .koshochka-widget-animated-right .koshochka-widget-head::before {
                    left: 14px;
               }
               .koshochka-widget-animated-right .koshochka-widget-head::after {
                    right: 6px;
                    top: 0;
                    z-index: -2;
               }
               .koshochka-widget-animated-left .koshochka-widget-head::before {
                    right: 14px;
               }
               .koshochka-widget-animated-left .koshochka-widget-head::after {
                    left: 6px;
                    top: 0;
                    z-index: -2;
               }
               .koshochka-widget-animated-right .koshochka-widget-head::after, 
               .koshochka-widget-animated-right .koshochka-widget-head::before {
                    transform: scaleY(2) rotate(65deg);
               }
               .koshochka-widget-animated-left .koshochka-widget-head::after, 
               .koshochka-widget-animated-left .koshochka-widget-head::before {
                    transform: scaleY(2) rotate(25deg);
               }
               .koshochka-widget-animated-left .koshochka-widget-head {
                    left: 15px;
               }
               .koshochka-widget-tail {
                    width: 14px;
                    height: 70px;
                    border-radius: 10px;
                    position: absolute;
                    bottom: 60px;
                    z-index: -1;
                    transform-origin: bottom center;
                    background: radial-gradient(ellipse at top left, rgb(195, 195, 195), rgb(28, 28, 28));
               }
               .koshochka-widget-animated-right .koshochka-widget-tail {
                    left: 42px;
                    animation: swingTailRight 0.75s linear infinite;
               }
               .koshochka-widget-animated-left .koshochka-widget-tail {
                    right: 42px;
                    animation: swingTailLeft 0.75s linear infinite;
               }
               .koshochka-widget-animated-right .koshochka-widget-inner {
                    animation: 12s linear infinite slideRight;
                    display: block;
                    }
               .koshochka-widget-animated-left .koshochka-widget-inner {
                    animation: 12s linear infinite slideLeft;
               display: block;
               }
               .koshochka-widget-leg {
                    width: 14px;
                    height: 50px;
                    position: absolute;
                    bottom: 6px;
                    border-radius: 4px;
                    background: linear-gradient(135deg, rgb(195, 195, 195), rgb(28, 28, 28));
                    z-index: -3;
                    transform-origin: top center;
               }
               .koshochka-widget-leg::after {
                    content: '';
                    width: 18px;
                    height: 12px;
                    border-radius: 20px;
                    position: absolute;
                    bottom: -6px;
                    z-index: -2;
                    background: linear-gradient(135deg, rgb(195, 195, 195), rgb(28, 28, 28));
               }
               .koshochka-widget-animated-right .koshochka-widget-leg::after {
                    left: 0;
               }
               .koshochka-widget-animated-left .koshochka-widget-leg::after {
                    right: 0;
               }
               .koshochka-widget-animated-left .koshochka-widget-front-left {
                    animation: 0.5s infinite linear toLeftLegLeftFront;
                    animation-delay: 0.25s;
               }
               .koshochka-widget-animated-left .koshochka-widget-front-right {
                    animation: 0.5s infinite linear toLeftLegRightFront;
                    animation-delay: 0.25s;
               }
               .koshochka-widget-animated-left .koshochka-widget-back-left {
                    animation: 0.5s infinite linear toLeftLegLeftBack; 
               }
               .koshochka-widget-animated-left .koshochka-widget-back-right {
                    animation: 0.5s infinite linear toLeftLegRightBack;
               }
               .koshochka-widget-animated-right .koshochka-widget-front-left {
                    animation: 0.5s infinite linear toRightLegLeftFront;
                    animation-delay: 0.25s;
               }
               .koshochka-widget-animated-right .koshochka-widget-front-right {
                    animation: 0.5s infinite linear toRightLegRightFront;
                    animation-delay: 0.25s;
               }
               .koshochka-widget-animated-right .koshochka-widget-back-left {
                    animation: 0.5s infinite linear toRightLegLeftBack;              
               }
               .koshochka-widget-animated-right .koshochka-widget-back-right {
                    animation: 0.5s infinite linear toRightLegRightBack; 
               }

               .koshochka-widget-mustache-front {
                    width: 16px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                    top: 63%;
                    box-shadow: 0px 1px 0px 0px #282828;
               }

               .koshochka-widget-mustache-back {
                    width: 5px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                    top: 63%;
                    box-shadow: 0px 1px 0px 0px #282828;
               }

               .koshochka-widget-mustache-back::before, .koshochka-widget-mustache-back::after {
                    content: '';
                    width: 4px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                    box-shadow: 0px 1px 0px 0px #282828;
               }

               .koshochka-widget-mustache-front::before, .koshochka-widget-mustache-front::after {
                    content: '';
                    width: 14px;
                    height: 1px;
                    background: #fff;
                    position: absolute;
                    box-shadow: 0px 1px 0px 0px #282828;
               }

               .koshochka-widget-mustache-front::before, 
               .koshochka-widget-mustache-back::before {
                    margin-top: -4px;
               }

               .koshochka-widget-mustache-front::after, 
               .koshochka-widget-mustache-back::after {
                    margin-top: 5px;
               }

               .koshochka-widget-mustache-back::before {
               margin-top: -4px;
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-front {
                    right: 8px;
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-front::before, 
               .koshochka-widget-animated-right .koshochka-widget-mustache-front::after {
               right: 0;
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-front::before, 
               .koshochka-widget-animated-left .koshochka-widget-mustache-front::after {
                    transform: rotate(11deg);
               }

               .koshochka-widget-animated-left .koshochka-widget-mustache-back::before, 
               .koshochka-widget-animated-right .koshochka-widget-mustache-back::after {
                    transform: rotate(20deg);
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-front::after, 
               .koshochka-widget-animated-left .koshochka-widget-mustache-front::before {
                    transform: rotate(-11deg);
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-back::before, 
               .koshochka-widget-animated-left .koshochka-widget-mustache-back::after {
                    transform: rotate(-20deg);
               }      

               .koshochka-widget-animated-left .koshochka-widget-mustache-front {
                    left: 8px;
               }

               .koshochka-widget-animated-left .koshochka-widget-mustache-front::before, 
               .koshochka-widget-animated-left .koshochka-widget-mustache-front::after {
                    left: 0;
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-back {
                    right: -4px;
               }

               .koshochka-widget-animated-right .koshochka-widget-mustache-back::before, 
               .koshochka-widget-animated-right .koshochka-widget-mustache-back::after {
                    right: 1px;
               }

               .koshochka-widget-animated-left .koshochka-widget-mustache-back {
                    left: -4px;
               }

               .koshochka-widget-animated-left .koshochka-widget-mustache-back::before, 
               .koshochka-widget-animated-left .koshochka-widget-mustache-back::after {
                    left: 1px;
               }

               .koshochka-widget-nose {
                    width: 5px;
                    height: 5px;
                    overflow: hidden;
                    position: absolute;
                    top: 58%;
                    border-radius: 2px;
                    background: #a86a5f;
               }
               .koshochka-widget-nose::after {
                    content: '';
                    background: #282828;
                    position: absolute;
                    bottom: -2px;
                    width: 4px;
                    height: 4px;
                    border-radius: 3px;
               }

               .koshochka-widget-animated-right .koshochka-widget-nose {
                    right: 2px;
               }

               .koshochka-widget-animated-left .koshochka-widget-nose {
                    left: 2px;
               }

               .koshochka-widget-animated-right .koshochka-widget-nose::after {
                    left: -1px;
               }

               .koshochka-widget-animated-left .koshochka-widget-nose::after {
                    right: -1px;
               }

               .koshochka-widget-eye {
                    width: 4px;
                    height: 4px;
                    background: #000;
                    border-radius: 2px;
                    position: absolute;
                    top: 37%;
               }

               .koshochka-widget-animated-right .koshochka-widget-eye {
                    right: 7px;
               }

               .koshochka-widget-animated-left .koshochka-widget-eye {
                    left: 7px;
               }

               @keyframes shake {
                    0% {
                        bottom: 0;
                    }
                    75% {
                        bottom: 3px;
                    }
                    100% {
                        bottom: 0;
                    }
               }

               @keyframes slideRight {
                    0% {
                         transform: translateX(-450px);
                    }
                    100% {
                         transform: translateX(120vw);
                    }
               }
               @keyframes slideLeft {
                    0% {
                         transform: translateX(120vw);
                    }
                    100% {
                         transform: translateX(-450px);
                    }
               }

               @keyframes toRightLegLeftFront {
                    0% {
                         right: 64px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
                    50% {
                         bottom: 12px;
                         transform: rotate(0deg);
                    }
                    75% {
                         transform: rotate(-20deg);
                    }
                    100% {
                         right: 44px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
               }
               @keyframes toRightLegRightFront {
                    0% {
                         right: 44px;
                    }
                    100% {
                         right: 64px;
                    }
               }
               @keyframes toRightLegLeftBack {
                    0% {
                         left: 44px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
                    50% {
                         bottom: 12px;
                         transform: rotate(0deg);
                    }
                    75% {
                         transform: rotate(-20deg);
                    }
                    100% {
                         left: 64px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
               }
               @keyframes toRightLegRightBack {
                    0% {
                         left: 64px;
                    }
                    100% {
                         left: 44px;
                    }
               }

               @keyframes toLeftLegLeftFront {
                    0% {
                         left: 64px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
                    50% {
                         bottom: 12px;
                         transform: rotate(0deg);
                    }
                    75% {
                         transform: rotate(20deg);
                    }
                    100% {
                         left: 44px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
               }
               @keyframes toLeftLegRightFront {
                    0% {
                         left: 44px;
                    }
                    100% {
                         left: 64px;
                    }
               }
               @keyframes toLeftLegLeftBack {
                    0% {
                         right: 44px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
                    50% {
                         bottom: 12px;
                         transform: rotate(0deg);
                    }
                    75% {
                         transform: rotate(20deg);
                    }
                    100% {
                         right: 64px;
                         bottom: 6px;
                         transform: rotate(0deg);
                    }
               }
               @keyframes toLeftLegRightBack {
                    0% {
                         right: 64px;
                    }
                    100% {
                         right: 44px;
                    }
               }

               @keyframes swingTailRight {
                    0% {
                         transform: rotate(-25deg) scaleY(0.9);
                    }
                    50% {
                         transform: rotate(-45deg) scaleY(1.2);
                    }
                    100% {
                         transform: rotate(-25deg) scaleY(0.9);
                    }
               }

               @keyframes swingTailLeft {
                    0% {
                         transform: rotate(25deg) scaleY(0.9);
                    }
                    50% {
                         transform: rotate(45deg) scaleY(1.2);
                    }
                    100% {
                         transform: rotate(25deg) scaleY(0.9);
                    }
               }
          `;
          document.head.appendChild(style);

          let koshochka = document.createElement('div');
          koshochka.classList.add('koshochka-widget-wrapper');
          document.body.appendChild(koshochka);
          koshochka.innerHTML = `
               <div class="koshochka-widget-container">
                    <div class="koshochka-widget-inner">
                         <div 
                              class="koshochka-widget-body"
                              style="background: radial-gradient(ellipse at top left, hsl(` + selectedColorH + `,` + selectedColorS + `, 80%), hsl(` + selectedColorH + `,` + selectedColorS + `, 20%));"
                         >
                         </div>
                         <div class="koshochka-widget-head">
                              <div class="koshochka-widget-mustache-front"></div>
                              <div class="koshochka-widget-mustache-back"></div>
                              <div class="koshochka-widget-nose"></div>
                              <div class="koshochka-widget-eye"></div>
                         </div>
                         <div class="koshochka-widget-tail"></div>
                         <div class="koshochka-widget-leg koshochka-widget-front-left"></div>
                         <div class="koshochka-widget-leg koshochka-widget-front-right"></div>
                         <div class="koshochka-widget-leg koshochka-widget-back-left"></div>
                         <div class="koshochka-widget-leg koshochka-widget-back-right"></div>
                    </div>
               </div>
          `;

          function checkAndAddClasses() {
              if (!koshochka.classList.contains('animated')) {
                  let timeout = Math.floor(Math.random() * (91)) + 10;
                    let timeout2 = timeout + 12000;
                    setTimeout(() => {
                        koshochka.classList.add('animated');
                        const randomClass = Math.random() < 0.5 ? 'koshochka-widget-animated-right' : 'koshochka-widget-animated-left';
                        koshochka.classList.add(randomClass);
                   }, timeout);
                    setTimeout(() => {
                       koshochka.classList.remove('animated', 'koshochka-widget-animated-right', 'koshochka-widget-animated-left');
                   }, timeout2);
              }
          }

          setInterval(checkAndAddClasses, 10000);
     }
}