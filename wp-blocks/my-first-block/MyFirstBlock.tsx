// MyFirstBlock.jsx
function MyFirstBlock({ style, className, attributes, children, ...props }) {
    const styles = {
      ...style,
    };
    const cssClassName = 'create-block-my-first-block';
    return (
        <div
            style={styles}
            className={cssClassName}
            dangerouslySetInnerHTML={{ __html: attributes.message }}
        />
    );
}

export default MyFirstBlock