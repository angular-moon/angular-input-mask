# Simple input mask directive and filter for [AngularJS](http://angularjs.org/)

***

简单的数字输入格式化指令,和格式化显示过滤器

Mask format uses 0 
Example: 0000-0000-0000-0000

Directive will look for attribute ng-mask on input
## Example: 
```HTML
<input name="test" maxlength="19" ng-mask="0000-0000-0000-0000" />
```

### Multiple masks
```HTML
<input name="test" maxlength="19" ng-mask="(00)00000-0000|(00)0000-0000" />
```
Use | to separate masks , 会优先匹配较短的 mask

## filter Example: 
```HTML
{{"111222333"| mask:"000-000-000"}}
```
#### Install via bower

    fis install angular-input-mask
