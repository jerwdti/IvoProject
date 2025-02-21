import React from 'react';

const ContractRenderer = ({ data }) => {
    if (!Array.isArray(data)) return null;

    const renderNode = (node, key, clauseCount = { clause: 1 }) => {
        if (!node) return null;

        if (typeof node.text === 'string') {
            const style = {
                fontWeight: node.bold ? 'bold' : 'normal',
                textDecoration: node.underline ? 'underline' : 'none',
            };
            return node.text.split('\n').map((part, index) => (
                <React.Fragment key={`${key}-${index}`}>
                    <span style={style}>{part}</span>
                    {index < node.text.split('\n').length - 1 && <br />}
                </React.Fragment>
            ));
        }

        if (!node.type || !node.children) return null;

        const children = node.children.map((child, index) => renderNode(child, `${key}-${index}`, clauseCount));

        switch (node.type) {
            case 'h1': return <h1 key={key}>{children}</h1>;
            case 'h4': return <h4 key={key}><span>{`${clauseCount.clause++}. `}</span>{children}</h4>;
            case 'p': return <p key={key}>{children}</p>;
            case 'ul': return <ul key={key}>{children}</ul>;
            case 'li': return <li key={key}>{node.children?.length ? children : node.text}</li>;
            case 'lic': return <React.Fragment key={key}>{children}</React.Fragment>;
            case 'mention': return <span key={key} style={{ backgroundColor: node.color }}>{children}</span>; // assuming if there is mention, i will get color
            case 'block':
            case 'clause': return <div key={key}>{children}</div>;
            default: console.warn('Unknown node type:', node.type); return null;
        }
    };

    return <div>{data.map((node, index) => renderNode(node, `${index}`, { clause: 1 }))}</div>;
};

export default ContractRenderer;