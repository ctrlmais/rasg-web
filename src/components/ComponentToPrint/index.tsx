import React from 'react';

function ComponentToPrint({ children }: any, ref: any) {
  return <div ref={ref}>{children}</div>;
}

export default React.forwardRef(ComponentToPrint);
