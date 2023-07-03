import lc from '@app/config/layout';

const headerStyle: React.CSSProperties = {
  
};

const useFooter = lc.footer.useFooterWithSider;

interface SiderContentStyleProps extends React.CSSProperties {
  headerHidden?: boolean;
  footerHidden?: boolean;
}

function getElementsSize(props: SiderContentStyleProps): number {
    const { footerHidden, headerHidden } = props;
    let size = !!headerHidden ? 0 : lc.header.height;
    size += !!footerHidden || !useFooter ? 0 : lc.footer.height;

    return size;
};

const generateSiderContentStyle = (props: SiderContentStyleProps) => ({
  height: `calc(100vh - ${ getElementsSize(props) }px)`,
});

const generateContentStyle = (props: SiderContentStyleProps) => ({
  minHeight: `calc(100vh - ${ getElementsSize(props) }px)`,
});

const siderStyle: React.CSSProperties = {
};

const footerStyle: React.CSSProperties = {
  padding: 0,
};

export { 
  headerStyle, 
  generateSiderContentStyle, 
  generateContentStyle, 
  siderStyle, 
  footerStyle, 
}