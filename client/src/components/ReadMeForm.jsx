import MarkdownIt from 'markdown-it';

// import renderHTML from 'react-render-html';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_README, UPDATE_README } from '../utils/mutations';
import { Link } from "react-router-dom";


const ReadMeForm = (props) => {
    console.log(props);
    const md = MarkdownIt();
    const result =md.render('# markdown it rules');
    const [userFormData, setUserFormData] = useState(
        props.readme
            ? props.readme 
            : {
                title: '',
                description: '',
                tableOfContents:'',
                installation: '',
                usage: '',
                credits: '',
                license: '',
                tests:'',
                repoLink: '',
                deployedLink: '',
            }
    );
    const [renderToggle, setRenderToggle] = useState('code');

    const [addReadMe, {error: addReadMeError }] = useMutation(ADD_README);
    const [updateReadMe, {error: updateReadMeError }] = useMutation(UPDATE_README);

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setUserFormData({ ...userFormData, [id]: value });
    };

    const handleToggle = () => {
        setRenderToggle(renderToggle === 'render' ? 'code' : 'render');
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log('submit')
        try {
            if (props.readme) {
                // if the readme already exists (editing), then update it
                await updateReadMe({
                    variables: { readMeId: props.readme._id, ...userFormData },
                });
            } else {
                // if the readme doesn't exist (adding), create a new one
                await addReadMe({
                    variables: { ...userFormData },
                });
            }
        } catch (e) {
          console.error(e);
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
            deployedLink: '',
        });
    };

    return (
        <Grid container spacing={2}>
            <Grid xs={6}>
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
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='description'  
                    label="Description"
                    value={userFormData.description}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='tableOfContents'  
                    label="Table of Contents"
                    value={userFormData.tableOfContents}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='installation'  
                    label="Installation"
                    value={userFormData.installation}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='usage'  
                    label="Usage"
                    value={userFormData.usage}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='credits'  
                    label="Credits"
                    value={userFormData.credits}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />
                    
                    <TextField
                    id='license'  
                    label="License"
                    value={userFormData.license}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='tests'  
                    label="Tests"
                    value={userFormData.tests}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='repoLink'  
                    label="Repository Link"
                    value={userFormData.repoLink}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <TextField
                    id='deployedLink'  
                    label="Deployed Link"
                    value={userFormData.deployedLink}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    />

                    <Button
                    disabled={!(userFormData.title)}
                    type='submit'
                    variant='contained'
                    >
                        Save
                    </Button>

                    <Link to='/me' >
                        <Button
                        type='button'
                        variant='contained'
                        >
                            Cancel
                        </Button>
                    </Link>

                </Box>
            </Grid>
            <Grid xs={6}>
            <FormGroup>
                <FormControlLabel  control={<Switch onChange={handleToggle}/>} label="Render" />
            </FormGroup>
                {renderToggle === 'code' ?
                <pre>
                {userFormData.title ? `# ${userFormData.title} \n\n`:''}
                {userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : ''}
                {userFormData.tableOfContents ? `## Table of Contents\n\n ${userFormData.tableOfContents}\n\n`:''}
                {userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n`:''}
                {userFormData.usage ? `## Usage\n\n ${userFormData.installation}\n\n`:''}
                {userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n`:''}
                {userFormData.license ? `## License\n\n ${userFormData.license}\n\n`:''}
                {userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n`:''}
                </pre>
                : 
                <div >
                < div dangerouslySetInnerHTML={{__html: md.render(`${
                    (userFormData.title ? `# ${userFormData.title} \n\n` : '')}${
                    (userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : '')}${
                    (userFormData.tableOfContents ? `## Table of Contents\n\n ${userFormData.tableOfContents}\n\n` : '')}${
                    (userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : '')}${
                    (userFormData.usage ? `## Usage\n\n ${userFormData.installation}\n\n`:'')}${
                    (userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n`:'')}${
                    (userFormData.license ? `## License\n\n ${userFormData.license}\n\n`:'')}${
                    (userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n`:'')}
                `)}}></div>
                </div>
                }
            </Grid>
        </Grid>
    );

}

export default ReadMeForm;