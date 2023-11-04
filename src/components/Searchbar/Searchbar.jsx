import { useState } from 'react';

import { Form, Button, InputList } from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  const handleSubmitSearch = event => {
    event.preventDefault();

    onSubmit(value);
    setValue('');
  };

  return (
    <header>
      <Form onSubmit={handleSubmitSearch}>
        <Button type="submit">
          <span>Search</span>
        </Button>

        <InputList
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </Form>
    </header>
  );
};

export default Searchbar;
