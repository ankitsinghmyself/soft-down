import React from 'react';
import { Card }  from '@nextui-org/react'; // Replace with actual NextUI component

export default function Default(props: any) {
  const { startContent, endContent, name, growth, value } = props;
  const textColorSecondary = 'text-secondaryGray-600'; // Replace with actual Tailwind CSS class

  return (
    <Card className="py-15"> {/* Use the Card component from Next.js UI */}
      <div className="my-auto flex items-center justify-center">
        {startContent}

        <div className={`my-auto ${startContent ? 'ms-18' : 'ms-0'}`}>
          <div className={`line-height-100% ${textColorSecondary} text-sm`}>
            {name}
          </div>
          <div className="text-black text-2xl">{value}</div>
          {growth ? (
            <div className="flex items-center">
              <div className="text-green-500 text-xs font-bold me-5">
                {growth}
              </div>
              <div className="text-secondaryGray-600 text-xs font-normal">
                since last month
              </div>
            </div>
          ) : null}
        </div>
        <div className="ms-auto w-max-content">{endContent}</div>
      </div>
    </Card>
  );
}
