var debounce = require('debounce');

module.exports = Component => class ResponsiveDropdown extends Component {
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
            inputs: ['breakpoint', 'content', 'href', 'src', 'mobileType', 'SVGID'],
            components: {
                MenuItem: require('weddell-menu-component/src/menu-item'),
                Menu: require('weddell-menu-component/'),
                Accordion: require('weddell-accordion-component')
            }
        }))
    }

    static get styles() {
        return (super.styles || '') + require('./index.css');
    }

    onMount() {
        this.onResize = this.checkViewport.bind(this)
        window.addEventListener('resize', this.onResize);
        this.checkViewport();
    }

    onUnmount() {
        window.removeEventListener('resize', this.onResize);
        this.onResize = null;
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

    checkViewport() {
        this.state.isMobile = window.innerWidth < Number(this.state.breakpoint);
    }
}
