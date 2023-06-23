import lc from '@app/config/layout';

const headerStyle: React.CSSProperties = {
  height: lc.header.heightInPx,
  lineHeight: 'initial',
  paddingInline: 0,
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
  height: lc.footer.heightInPx,
  padding: 0,
  lineHeight: lc.footer.heightInPx,
};

export { 
  headerStyle, 
  generateSiderContentStyle, 
  generateContentStyle, 
  siderStyle, 
  footerStyle, 
}