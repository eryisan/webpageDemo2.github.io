// CSS动画测试 模拟效果

// 设置动画的元素
var screenAnimateElements = {
    '.screen-1' : [
        '.screen-1__heading',
        '.screen-1__subheading',
    ],
    '.screen-2' : [
        '.screen-2__heading',
        '.screen-2__underline',
        '.screen-2__subheading',
        '.screen-2__bg',
        '.screen-2__human',
        '.screen-2__rocket',
    ],
    '.screen-3' : [
        '.screen-3__heading',
        '.screen-3__underline',
        '.screen-3__subheading',
        '.screen-3__bg',
        '.screen-3__language__item_1',
        '.screen-3__language__item_2',
        '.screen-3__language__item_3',
        '.screen-3__language__item_4',
        '.screen-3__language__item_5',
    ],
    '.screen-4' : [
        '.screen-4__heading',
        '.screen-4__underline',
        '.screen-4__subheading',
        '.screen-4__features__item_1',
        '.screen-4__features__item_2',
        '.screen-4__features__item_3',
        '.screen-4__features__item_4',
    ],
    '.screen-5' : [
        '.screen-5__heading',
        '.screen-5__underline',
        '.screen-5__subheading',
        '.screen-5__bg',
    ],
}


function setScreenAnimate(screenCls){

    // 获取DOM屏幕
    var screen = document.querySelector(screenCls);

    // 获取选择屏的动画元素数组
    var animateElements = screenAnimateElements[screenCls];

    // 设置元素初始状态和动画状态
    var isSetAnimateClass = false;
    var isAnimateDone = false;

    screen.onclick = function(){

        // 初始化样式,增加init
        if(isSetAnimateClass === false){
            for(var i=0;i<animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
            }
            isSetAnimateClass = true;
            return;
        }

        // 切换所有animateElements的 init → done
        if(isAnimateDone === false){
            for(var i=0;i<animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
            }
            isAnimateDone = true;
            return;
        }


        // 切换所有animateElements的 done → init
        if(isAnimateDone === true){
            for(var i=0;i<animateElements.length;i++){
                var element = document.querySelector(animateElements[i]);
                var baseCls = element.getAttribute('class');
                element.setAttribute('class',baseCls.replace('_animate_done','_animate_init'));
            }
            isAnimateDone = false;
            return;
        }
    }

}

for(k in screenAnimateElements){
    setScreenAnimate(k);
}