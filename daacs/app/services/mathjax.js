import Ember from "ember";

const {
    $,
    run: { scheduleOnce },
} = Ember;

export default Ember.Service.extend({
    rerender() {
        scheduleOnce("afterRender", this, "renderFormulas");
    },

    renderFormulas(element) {
        if (window.MathJax) {
            MathJax.Hub.Config({
                "HTML-CSS": { linebreaks: { automatic: true } },
                SVG: { linebreaks: { automatic: true } },
            });
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, element]);
        }
    },

    destroyFormulas(element) {
        if (window.MathJax) {
            const formulas = MathJax.Hub.getAllJax(element);
            formulas.forEach((formula) => {
                $(formula.SourceElement()).remove();
                formula.Remove();
            });
        }
    },
});
