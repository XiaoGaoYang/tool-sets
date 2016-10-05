# 踩坑记录

## ScrollView子元素Press事件坑

**出现情况：**界面中有一个输入框处于聚焦，软键盘显示状态，`ScrollView`下有子元素有`onPress`事件，此时点击`ScrollView`下有`onPress`事件的元素，并不会触发子元素的`onPress`事件，而是使输入框失焦，软键盘消失，第二次点击才会处理`onPress`事件

**解决方法：**使用`View`代替`ScrollView`,在子元素`onPress`事件里调用`DismissKeyboard()`方法，使输入框失焦，软键盘消失