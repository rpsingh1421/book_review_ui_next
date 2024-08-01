import React from 'react';

const page = ({ params }) => {
    const reveiewId = params.id;
  return (
    <div>
      review id: {reveiewId}
    </div>
  );
}

export default page;
