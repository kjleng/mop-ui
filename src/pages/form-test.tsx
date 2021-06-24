import {
  TextField,
  Box,
  makeStyles,
  Select,
  MenuItem,
  InputLabel,
  Button,
} from '@material-ui/core';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { validEmail } from 'utils/validators.utils';

type FormInputs = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
};

const useStyles = makeStyles(() => ({
  form: {
    display: `flex`,
    flexDirection: `column`,
    alignItems: `stretch`,
    width: `50vw`,
    margin: `0 auto`,
    '& > *': {
      marginTop: `2.5rem`,
    },
  },
}));

export default function FormTest() {
  const { control, handleSubmit, formState } = useForm<FormInputs>(); // Not much different from react state -- desctructure what you need from the hook and get type safety by passing a generic
  const { errors } = formState;
  const classes = useStyles();

  /**
   * This is a callback function you can pass into the handleSubmit function rhf gives us.
   * This function will ONLY be called if all required / validation
   * rules are passed.  rhf takes care of that for us -- if this function is
   * called, then all of our rules have passed, otherwise, this function is not called and the
   * `formState.errors` object gets updated.  Note -- no need to e.preventDefault() or
   * in general deal with the event at all.
   */
  const onSubmit = (validatedFieldValues: FormInputs) => {
    console.log(
      `The form's values have passed your validation.  Call the api or whatever with them here.`
    );
    console.log(`firstName: ${validatedFieldValues.firstName}`);
    console.log(`lastName: ${validatedFieldValues.lastName}`);
    console.log(`email: ${validatedFieldValues.email}`);
    console.log(`age: ${validatedFieldValues.age}`);
  };

  /**
   * Added error logging to show example.  rhf doesn't log or check for errors until submit.
   * If on submit there's an error, then the errors will update on every onChange to an input
   * so that a user can see as they type if they've resolved the error.
   */
  if (errors) console.error(errors);

  return (
    <Box mt={10}>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        {/* Important to wrap our submit handler in rhf's handleSubmit */}
        <Controller
          name="firstName" // Each component needs a "name" prop for rhf to track it, when the form is submitted this will be its [key] in the errors or value object
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.firstName}
              InputProps={{
                'aria-required': true,
                'aria-invalid': !!errors.firstName,
              }}
              label="First Name"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="lastName"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.lastName}
              InputProps={{
                'aria-required': true,
                'aria-invalid': !!errors.lastName,
              }}
              label="Last Name"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: validEmail, // optional regex validations can go here
          }}
          render={({ field: { onChange, value } }) => (
            <TextField
              error={!!errors.email}
              InputProps={{
                'aria-required': true,
                'aria-invalid': !!errors.email,
              }}
              label="email"
              value={value}
              onChange={onChange}
            />
          )}
        />
        <Controller
          name="age"
          control={control}
          defaultValue=""
          rules={{
            validate: (value) => value !== `. . .`, // optional callback can evaluate value at submit time and validate
          }}
          render={({ field: { onChange, value } }) => (
            <>
              <Select labelId="age-select-label" onChange={onChange} value={value}>
                {[
                  `. . .`,
                  `0 - 10`,
                  `11 - 20`,
                  `21 - 30`,
                  `31 - 40`,
                  `41 - 50`,
                  `51 - 60`,
                  `60+`,
                ].map((ageGroup) => (
                  <MenuItem key={ageGroup} value={ageGroup}>
                    {ageGroup}
                  </MenuItem>
                ))}
              </Select>
              <InputLabel error={!!errors.age} id="age-select-label">
                Enter your age
              </InputLabel>
            </>
          )}
        />
        <Button color="secondary" type="submit">
          Submit
        </Button>
      </form>
    </Box>
  );
}
