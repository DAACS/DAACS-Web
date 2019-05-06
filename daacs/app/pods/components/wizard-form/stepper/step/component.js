import TabItem from 'daacs/pods/components/tab-item/component';

export default TabItem.extend({
    tagName: 'div',
    classNames: ['wizard-stepper-step'],
    classNameBindings: ['isComplete:completed:incomplete']
});
