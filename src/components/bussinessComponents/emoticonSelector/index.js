import React from 'react';
import MultiEmoticonSelect from './MultiEmoticonSelect';
import SimpleEmoticonSelect from './SimpleEmoticonSelect';

function Index({ multiple = true, ...others }) {
  return (
    <div>
      {multiple ? <MultiEmoticonSelect {...others} /> : <SimpleEmoticonSelect {...others} />}
    </div>
  );
}

export default Index;
