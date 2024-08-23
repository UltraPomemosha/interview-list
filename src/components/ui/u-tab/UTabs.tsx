import { UTabsProps } from "./types";
import UTab from "./UTab.tsx";

function UTabs({ data, name, picked, setPicked, className }: UTabsProps) {
  return (
    <>
      {data.map(tab => (
        <UTab
          className={className}
          setPicked={setPicked}
          id={tab.id}
          title={tab.title}
          value={tab.value}
          name={name}
          key={tab.id}
          checked={picked === tab.value}
        />
      ))}
    </>
  );
}

export default UTabs;
