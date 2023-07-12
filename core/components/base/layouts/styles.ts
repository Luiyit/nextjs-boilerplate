export interface SiderContentStyleProps extends React.CSSProperties {
  headerHidden?: boolean
  footerHidden?: boolean
  headerHeight: number
  footerHeight: number
  useFooter: boolean
}

function getElementsSize(config: SiderContentStyleProps): number {
    const { footerHidden, headerHidden } = config;
    let size = !!headerHidden ? 0 : config.headerHeight;
    size += !!footerHidden || !config.useFooter ? 0 : config.footerHeight;

    return size;
};

const generateSiderContentStyle = (props: SiderContentStyleProps) => ({
  height: `calc(100vh - ${ getElementsSize(props) }px)`,
});

const generateContentStyle = (props: SiderContentStyleProps) => ({
  minHeight: `calc(100vh - ${ getElementsSize(props) }px)`,
});

export { 
  generateSiderContentStyle, 
  generateContentStyle,
}