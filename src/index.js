var debounce = require('debounce');

module.exports = Component => class ResponsiveMenu extends Component {
    constructor(opts) {
        super(Object.assign(opts, {
            state: Object.assign(opts.state || {}, {
                breakpoint: 640,
                isMobile: false,
                isLoading: false,
                mobileType: 'accordion'
            }),
            store: Object.assign(opts.store, {
            }),
            markupTemplate: require('./index.pug'),
            inputs: ['breakpoint', 'mobileType'],
            components: {
                Menu: require('weddell-menu-component'),
                Accordion: require('weddell-accordion-component'),
                ResponsiveDropdown: [require('./components/responsive-dropdown'), {breakpoint: 'breakpoint', mobileType: 'mobileType'}]
            }
        }))
    }

    static get styles() {
        return (super.styles || '') + require('./index.css');
    }

    onInit() {
        this.state.watch('isMobile', isMobile => {
            this.state.isLoading = true;
            this.awaitRender()
                .then(() => {
                    this.state.isLoading = false;
                })
        })        
    }

    onMount() {
        this.onResize = this.checkViewport.bind(this);
        window.addEventListener('resize', this.onResize);
        this.checkViewport();
    }

    onUnmount() {
        window.removeEventListener('resize', this.onResize);
        this.onResize = null;
    }

    checkViewport() {
        this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
    }
}
