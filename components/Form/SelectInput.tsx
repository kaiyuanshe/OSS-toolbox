import { FC, HTMLProps } from 'react';
import { uniqueID } from 'web-utility';

export interface SelectInputProps extends HTMLProps<HTMLInputElement> {
  options?: string[];
}

export const SelectInput: FC<SelectInputProps> = ({
  options,
  id = uniqueID(),
  ...props
}) => (
  <>
    <input {...props} id={id} list={`${id}-options`} />

    <datalist id={`${id}-options`}>
      {options?.map(value => <option key={value} value={value} />)}
    </datalist>
  </>
);
