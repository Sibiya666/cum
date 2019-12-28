export interface DropdownItem<T> {
  label: string;
  value: T
}

export const MATRIAL_TYPE = {
  male: [
    {
      label: 'Женат',
      value: 'married'
    },
    {
      label: 'Не женат',
      value: 'single'
    }
  ],
  female: [
    {
      label: 'Замужем',
      value: 'married'
    },
    {
      label: 'Не замужем',
      value: 'single'
    }
  ],
}


export const GENDER = {
  female: 'Женский',
  male: 'Мужской'
}
