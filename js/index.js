// 获取元素

var getElem = function(selector){
    return document.querySelector(selector);
}
var getAllElem = function(selector){
    return document.querySelectorAll(selector);
}

// 获取元素样式
var getCls = function(element){
    return element.getAttribute('class');
}

// 设置元素样式
var setCls = function(element,cls){
    return element.setAttribute('class',cls);
}

// 为元素添加样式
var addCls = function( element , cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) === -1){
        setCls(element , baseCls+' '+cls);
    }
    
}

// 为元素删除样式
var delCls = function( element , cls){
    var baseCls = getCls(element);
    if(baseCls.indexOf(cls) != -1){
        setCls(element,baseCls.split(cls).join(' ').replace(/\s+/g,' '));
    }
}

// 第一步初始化状态init  复用text代码
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

// 1设置屏内元素为初始状态
var SetScreenAnimateInit = function(screenCls){

    var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];

    // 设为初始init
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls+' '+animateElements[i].substr(1)+'_animate_init');
    }
}

// 设置播放屏内的元素动画
var playScreenAnimateDone = function(screenCls){

    var screen = document.querySelector(screenCls);
    var animateElements = screenAnimateElements[screenCls];

    // init → done
    for(var i=0;i<animateElements.length;i++){
        var element = document.querySelector(animateElements[i]);
        var baseCls = element.getAttribute('class');
        element.setAttribute('class',baseCls.replace('_animate_init','_animate_done'));
    }
}


window.onload = function(){

    for(k in screenAnimateElements){
        // 第一屏动画跳过,用延迟函数播放,没有init初始状态,得在html里手写
        if(k === '.screen-1'){
            continue;
        }

        SetScreenAnimateInit(k);
    }
}

// 获取导航和大纲的item数组
var navItems = getAllElem('.header__nav-item');
var outlineItems = getAllElem('.outline__item');
// 第四步 导航滑动门
var navTip = getElem('.header__nav-tip');

// 设置当前屏幕,导航和大纲的item_status_active活动状态
// 删除所有索引_status_active活动状态和位置,给当前索引添加_status_active活动状态和位置
// 调用函数到滚动函数,滚动到哪哪里高亮
var switchNavItemsActive = function( idx ){

    // 设置导航
    for(var i=0;i<navItems.length;i++){
        delCls(navItems[i],'header__nav-item_status_active');
        // 滚动到哪,哪里高亮.哪里滑动门.
        navTip.style.left = 0+"px";
    }
    addCls(navItems[idx],'header__nav-item_status_active');
    // 
    navTip.style.left = (idx*100)+"px";

    // 设置大纲
    for(var i=0;i<outlineItems.length;i++){
        delCls(outlineItems[i],'outline__item_status_active');
    }
    addCls(outlineItems[idx],'outline__item_status_active');
}


switchNavItemsActive(0);

// 第二步 滚动的到哪里,就播放到哪里
window.onscroll = function(){
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    
    // 导航和大纲的隐藏显示,预先设置好animate.css文件下的_status_white效果
    if(top>80){
        addCls(getElem('.header__wrap'),'header__wrap_status_white');
        addCls(getElem('.outline'),'outline_status_in');
    }else{
        delCls(getElem('.header__wrap'),'header__wrap_status_white');
        delCls(getElem('.outline'),'outline_status_in');

        switchNavItemsActive(0);
    }

    // 用滚动高度,判断滚动到哪显示到哪
    if(top > 1 ){
        playScreenAnimateDone('.screen-1')
    }
    if(top > 640*1 - 100 ){
        playScreenAnimateDone('.screen-2');
        switchNavItemsActive(1);
    }
    if(top > 640*2 - 100 ){
        playScreenAnimateDone('.screen-3');
        switchNavItemsActive(2);
    }
    if(top > 640*3 - 100 ){
        playScreenAnimateDone('.screen-4');
        switchNavItemsActive(3);
    }
    if(top > 640*4 - 100 ){
        playScreenAnimateDone('.screen-5');
        switchNavItemsActive(4);
    }
}

// 第三步双向定位

// 给每个item添加点击事件,按照 索引*高度 跳转屏幕
var setNavJump = function(i,lib){
    var item = lib[i];      //这里不要写死,否则只能绑定导航
    item.onclick = function(){
        document.documentElement.scrollTop = (i*640)-60;
        document.body.scrollTop = (i*640)-60;
    }
}

// 调用函数直接给导航和大纲双向绑定
for(var i=0;i<navItems.length;i++){
    setNavJump(i,navItems);
}
for(var i=0;i<outlineItems.length;i++){
    setNavJump(i,outlineItems);
}


// 第四步  鼠标over和out滑动门特效
var setTip = function(idx,lib){

    // 鼠标移入,滑动门位置到哪
    lib[idx].onmouseover = function(){
        navTip.style.left = (idx*100)+"px";
    }

    var activeIdx = 0;
    // 鼠标移出,滑动门位置到当前屏幕索引
    lib[idx].onmouseout = function(){
        // 遍历所有nav所有items,查找哪个是_status_active活动状态,设置滑动门为当前索引
        for(var i=0;i<lib.length;i++){
            if(getCls(lib[i]).indexOf('header__nav-item_status_active') > -1){
                activeIdx = i;
                break;
            }
        }
        navTip.style.left = (activeIdx*100)+"px";
    }
}


// 调用函数给navItems设置滑动门效果
for(var i=0;i<navItems.length;i++){
    setTip(i,navItems);
}

setTimeout(function(){
    playScreenAnimateDone('.screen-1');
},300)
