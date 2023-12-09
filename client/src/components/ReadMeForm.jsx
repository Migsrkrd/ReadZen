
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useState } from 'react';

const ReadMeForm = () => {

    const [userFormData, setUserFormData] = useState({
        title: '',
        description: '',
        tableOfContents:'',
        installation: '',
        usage: '',
        credits: '',
        license: '',
        tests:'',
        repoLink: '',
        deployLink: ''
    })

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUserFormData({ ...userFormData, [id]: value });
      };

      const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
          //creates a new user in the db
          const { data } = await addUser({
            variables: { ...userFormData },
          });
    
          Auth.login(data.addUser.token);
        } catch (e) {
          console.error(e);
          setShowAlert(true);
        }
    
        setUserFormData({
            title: '',
            description: '',
            tableOfContents:'',
            installation: '',
            usage: '',
            credits: '',
            license: '',
            tests:'',
            repoLink: '',
            deployLink: ''
        });
      };
    return (
        <>
            <Box 
            component="form"
            sx={{
            '& > :not(style)': { m: 1 },
            }}
            onSubmit={handleFormSubmit}
            noValidate
            autoComplete="off"
            >
                <TextField
                id='title'  
                label="Title"
                value={userFormData.title}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='description'  
                label="Description"
                value={userFormData.description}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='tableOfContents'  
                label="Table of Contents"
                value={userFormData.tableOfContents}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='installation'  
                label="Installation"
                value={userFormData.installation}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='usage'  
                label="Usage"
                value={userFormData.usage}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='credits'  
                label="Credits"
                value={userFormData.credits}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='license'  
                label="License"
                value={userFormData.license}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='tests'  
                label="Tests"
                value={userFormData.tests}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='repoLink'  
                label="Repository Link"
                value={userFormData.repoLink}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <TextField
                id='deployLink'  
                label="Deployed Link"
                value={userFormData.deployLink}
                onChange={handleInputChange}
                // fullWidth
                margin="normal"
                />
                <Button
                disabled={!(userFormData.title)}
                type='submit'
                variant='contained'>
                Publish
                </Button>
                <Button
                disabled={!(userFormData.title)}
                type='submit'
                variant='contained'>
                Save
                </Button>
            </Box>
        </>
    )

}

export default ReadMeForm;