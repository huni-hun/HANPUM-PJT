import React from 'react';

function TextLineBreaks({ children }: { children: string }) {
  return (
    <>
      {children.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </>
  );
}

export default TextLineBreaks;
