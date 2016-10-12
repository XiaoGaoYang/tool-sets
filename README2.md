# 踩坑记录

## ScrollView子元素Press事件坑

**出现情况：**界面中有一个输入框处于聚焦，软键盘显示状态，`ScrollView`下有子元素有`onPress`事件，此时点击`ScrollView`下有`onPress`事件的元素，并不会触发子元素的`onPress`事件，而是使输入框失焦，软键盘消失，第二次点击才会处理`onPress`事件

**解决方法：**使用`View`代替`ScrollView`,在子元素`onPress`事件里调用`DismissKeyboard()`方法，使输入框失焦，软键盘消失

## 开启远程调试时LongPress事件坑

**出现情况：**当开启远程调试时，有`onLongPress`事件的元素，只要一press就会立即触发`onLongPress`事件，而不是长按触发

**解决方法：**  
方法1：关闭远程调试  
方法2：给有`onLongPress`事件的元素添加`delayLongPress`属性，手动指定延迟时间  
**参考链接：**[onLongPress (and delayLongPress) triggers immediately · Issue #4944 · facebook/react-native](https://github.com/facebook/react-native/issues/4944)