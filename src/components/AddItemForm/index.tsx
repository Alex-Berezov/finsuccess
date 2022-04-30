import React, { FC } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { IBalance } from './../../Types/Types';

import './styles.scss';

interface initialValuesProps {
  addFormItemValue: string
}

interface AddItemFormProps {
  addItem: (obj: IBalance) => void
  isAddingItem: boolean
  setIsAddingItem: (bool: boolean) => void
}

const AddItemForm: FC<AddItemFormProps> = ({ addItem, isAddingItem, setIsAddingItem }) => {
  const initialValues: initialValuesProps = { addFormItemValue: '' };

  const AddItemSchema = Yup.object().shape({
    addFormItemValue: Yup.string()
      .min(2, 'Слишком мало букв')
      .max(22, 'Слишком много букв')
      .required('Поле не должно быть пустым')
  });

  return (
    <>
      {
        isAddingItem
          ? (
            <Formik
              initialValues={initialValues}
              validationSchema={AddItemSchema}
              onSubmit={(values, actions) => {
                actions.setSubmitting(false);
                addItem({ id: uuidv4(), name: values.addFormItemValue, value: 0 })
                setIsAddingItem(false);
              }}
            >
              {({ errors, touched }) => (
                <Form className='addItemForm'>
                  <div className="addItemForm__field-block">
                    <Field id="addFormItemValue" name="addFormItemValue" placeholder="Новая статья" />
                    {
                      errors.addFormItemValue && touched.addFormItemValue
                        ? <span className='error'>{errors.addFormItemValue}</span>
                        : null
                    }
                  </div>
                  <button className='okBtn' type="submit">Ok</button>
                </Form>
              )}
            </Formik>
          )
          : null
      }
    </>
  );
};

export default AddItemForm;