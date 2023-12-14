import MarkdownIt from 'markdown-it';
// import renderHTML from 'react-render-html';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button, Popper, Select } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import { useState, useRef } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_README, UPDATE_README } from '../utils/mutations';
import { Link } from "react-router-dom";

const ReadMeForm = (props) => {
  const myElRef=useRef(null);
    const md = MarkdownIt()
    const [formats, setFormats] = useState(() => ['bold', 'italic']);
    const [ToC, setToC] = useState(null);
    //bold, italics, code, bullets, quotes, code block, block quote, strike through, highlight
    const handleFormat = (event, newFormats) => {
      let target = event.target;
      while (target && target.getAttribute && target.getAttribute('value') === null) {
        target = target.parentNode;
      }
      const value = target.getAttribute('value');
      const selection = window.getSelection().toString();
      if(selection){
      const regex = new RegExp(window.getSelection().toString(), "gi");
      for (let key in userFormData) {
            const matches = userFormData[key].match(regex);
            if(matches){
              cases(value, key, matches);
            }
      }
    }
      setFormats(newFormats);
    };

    const cases = (value, key, matches) => {
      switch (value) {
        case 'bold': 
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` **${matches[0]}** `) });
          break;
        case 'italics':
          setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` *${matches[0]}* `) });
          break;
          case 'underline':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` <u>${matches[0]}</u> `) });
            break;
          case 'code':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` \`${matches[0]}\` `) });
           break;
           case 'code block':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` \`\`\`${matches[0]}\`\`\` `) });
           break;
           case 'bullet':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n * ${matches[0]}`) });
           break;
           case 'highlight':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` <mark> ${matches[0]} </mark> `) });
           break;
           case 'block quote':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n > ${matches[0]}`) });
           break;
           case 'strike through':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],` ~~${matches[0]}~~ `) });
           break;
           case 'h1':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n # ${matches[0]} `) });
           break;
           case 'h2':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n ## ${matches[0]} `) });
           break;
           case 'h3':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`\n ### ${matches[0]} `) });
           break;
           case 'link':
            setUserFormData({ ...userFormData, [key]: userFormData[key].replace(matches[0],`[${matches[0]}](${matches[0]}) `) });
           break;
        default:
          // code to be executed if expression doesn't match any case
      }
    }

    const [userFormData, setUserFormData] = useState(
        props.readme
          ? {
            title:           props.readme.title,
            description:     props.readme.description,
            tableOfContents: props.readme.tableOfContents,
            installation:    props.readme.installation,
            usage:           props.readme.usage,
            credits:         props.readme.credits,
            license:         props.readme.license,
            tests:           props.readme.tests,
            repoLink:        props.readme.repoLink,
            deployedLink:    props.readme.deployedLink,
          }
          : {
            title:           '',
            description:     '',
            tableOfContents: '',
            installation:    '',
            usage:           '',
            credits:         '',
            license:         '',
            tests:           '',
            repoLink:        '',
            deployedLink:    '',
          }
    );

    const [renderToggle, setRenderToggle] = useState('code');
    const [anchorEl, setAnchorEl] = useState(null);
    const [addReadMe, {error: addReadMeError }] = useMutation(ADD_README);
    const [updateReadMe, {error: updateReadMeError }] = useMutation(UPDATE_README);

    const handleInputChange = (event) => {
      // console.log(event.target);
        let { id, value } = event.target;
        id=(id ? id : event.target.name);
        setUserFormData({ ...userFormData, [id]: value });
    };

    const handleToggle = (event) => {
      setToC(string) 
      renderToggle === 'render' ? (
      setRenderToggle('code'), setAnchorEl(null))
      : (setRenderToggle('render'), setAnchorEl(event.currentTarget));

    };
    let string;
    const tableOfContents = (userFormData)=>{
      string = (userFormData.title ? `## Table of Contents\n\n- [Title](#title)\n\n` : '') + 
      (userFormData.description ? `- [Description](#description)\n\n` : '') +
      (userFormData.installation ? `- [Installation](#installation)\n\n` : '') +
      (userFormData.usage ? `- [Usage](#usage)\n\n` : '') +
      (userFormData.credits ? `- [Credits](#credits)\n\n` : '') +
      (userFormData.license ? `- [License](#license)\n\n` : '') +
      (userFormData.tests ? `- [Tests](#tests)` : '')
      return (
        string
      )
    }
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (props.readme) {
                // if the readme already exists (editing), then update it
                console.log('update')
                await updateReadMe({
                    variables: {
                      readMeId: props.readme._id,
                      markdown: myElRef.current.textContent,
                      datePublished: '',
                      isPublished: false,
                      ...userFormData
                    },
                });

            } else {
                // if the readme doesn't exist (adding), create a new one
                await addReadMe({
                    variables: {markdown:myElRef.current.textContent, ...userFormData },
                });
                          
            }
        } catch (e) {
          console.error(e);
        }
  
        // clear the form
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
        window.location.href = '/me';
    };

    return (
        <Grid container spacing={2} disableEqualOverflow>
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
                    spellCheck='true'
                    id='title'  
                    label="Title"
                    value={userFormData.title}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='description'  
                    label="Description"
                    value={userFormData.description}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />
{/* 
                    <TextField
                    id='tableOfContents'  
                    label="Table of Contents"
                    value={userFormData.tableOfContents}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    /> */}

                    <TextField
                    id='installation'  
                    label="Installation"
                    value={userFormData.installation}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='usage'  
                    label="Usage"
                    value={userFormData.usage}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='credits'  
                    label="Credits"
                    value={userFormData.credits}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />
                    
                    {/* <TextField
                    id='license'  
                    label="License"
                    value={userFormData.license}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    /> */}
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">License</InputLabel>
                    <Select
                    id='license'
                    name='license'
                    value={userFormData.license}
                    label="License"
                    onChange={handleInputChange}
                    >
                    <MenuItem value={`MIT License

Copyright (c) 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`}>MIT</MenuItem>
                    <MenuItem value={`The Unlicense
      
      This is free and unencumbered software released into the public domain.

      Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means.
      
      In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law.
      
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
    }>The Unlicense</MenuItem>
                    <MenuItem value={`                                 Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.

      "Work" shall mean the work of authorship, whether in Source or
      Object form, made available under the License, as indicated by a
      copyright notice that is included in or attached to the work
      (an example is provided in the Appendix below).

      "Derivative Works" shall mean any work, whether in Source or Object
      form, that is based on (or derived from) the Work and for which the
      editorial revisions, annotations, elaborations, or other modifications
      represent, as a whole, an original work of authorship. For the purposes
      of this License, Derivative Works shall not include works that remain
      separable from, or merely link (or bind by name) to the interfaces of,
      the Work and Derivative Works thereof.

      "Contribution" shall mean any work of authorship, including
      the original version of the Work and any modifications or additions
      to that Work or Derivative Works thereof, that is intentionally
      submitted to Licensor for inclusion in the Work by the copyright owner
      or by an individual or Legal Entity authorized to submit on behalf of
      the copyright owner. For the purposes of this definition, "submitted"
      means any form of electronic, verbal, or written communication sent
      to the Licensor or its representatives, including but not limited to
      communication on electronic mailing lists, source code control systems,
      and issue tracking systems that are managed by, or on behalf of, the
      Licensor for the purpose of discussing and improving the Work, but
      excluding communication that is conspicuously marked or otherwise
      designated in writing by the copyright owner as "Not a Contribution."

      "Contributor" shall mean Licensor and any individual or Legal Entity
      on behalf of whom a Contribution has been received by Licensor and
      subsequently incorporated within the Work.

   2. Grant of Copyright License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      copyright license to reproduce, prepare Derivative Works of,
      publicly display, publicly perform, sublicense, and distribute the
      Work and such Derivative Works in Source or Object form.

   3. Grant of Patent License. Subject to the terms and conditions of
      this License, each Contributor hereby grants to You a perpetual,
      worldwide, non-exclusive, no-charge, royalty-free, irrevocable
      (except as stated in this section) patent license to make, have made,
      use, offer to sell, sell, import, and otherwise transfer the Work,
      where such license applies only to those patent claims licensable
      by such Contributor that are necessarily infringed by their
      Contribution(s) alone or by combination of their Contribution(s)
      with the Work to which such Contribution(s) was submitted. If You
      institute patent litigation against any entity (including a
      cross-claim or counterclaim in a lawsuit) alleging that the Work
      or a Contribution incorporated within the Work constitutes direct
      or contributory patent infringement, then any patent licenses
      granted to You under this License for that Work shall terminate
      as of the date such litigation is filed.

   4. Redistribution. You may reproduce and distribute copies of the
      Work or Derivative Works thereof in any medium, with or without
      modifications, and in Source or Object form, provided that You
      meet the following conditions:

      (a) You must give any other recipients of the Work or
          Derivative Works a copy of this License; and

      (b) You must cause any modified files to carry prominent notices
          stating that You changed the files; and

      (c) You must retain, in the Source form of any Derivative Works
          that You distribute, all copyright, patent, trademark, and
          attribution notices from the Source form of the Work,
          excluding those notices that do not pertain to any part of
          the Derivative Works; and

      (d) If the Work includes a "NOTICE" text file as part of its
          distribution, then any Derivative Works that You distribute must
          include a readable copy of the attribution notices contained
          within such NOTICE file, excluding those notices that do not
          pertain to any part of the Derivative Works, in at least one
          of the following places: within a NOTICE text file distributed
          as part of the Derivative Works; within the Source form or
          documentation, if provided along with the Derivative Works; or,
          within a display generated by the Derivative Works, if and
          wherever such third-party notices normally appear. The contents
          of the NOTICE file are for informational purposes only and
          do not modify the License. You may add Your own attribution
          notices within Derivative Works that You distribute, alongside
          or as an addendum to the NOTICE text from the Work, provided
          that such additional attribution notices cannot be construed
          as modifying the License.

      You may add Your own copyright statement to Your modifications and
      may provide additional or different license terms and conditions
      for use, reproduction, or distribution of Your modifications, or
      for any such Derivative Works as a whole, provided Your use,
      reproduction, and distribution of the Work otherwise complies with
      the conditions stated in this License.

   5. Submission of Contributions. Unless You explicitly state otherwise,
      any Contribution intentionally submitted for inclusion in the Work
      by You to the Licensor shall be under the terms and conditions of
      this License, without any additional terms or conditions.
      Notwithstanding the above, nothing herein shall supersede or modify
      the terms of any separate license agreement you may have executed
      with Licensor regarding such Contributions.

   6. Trademarks. This License does not grant permission to use the trade
      names, trademarks, service marks, or product names of the Licensor,
      except as required for reasonable and customary use in describing the
      origin of the Work and reproducing the content of the NOTICE file.

   7. Disclaimer of Warranty. Unless required by applicable law or
      agreed to in writing, Licensor provides the Work (and each
      Contributor provides its Contributions) on an "AS IS" BASIS,
      WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or
      implied, including, without limitation, any warranties or conditions
      of TITLE, NON-INFRINGEMENT, MERCHANTABILITY, or FITNESS FOR A
      PARTICULAR PURPOSE. You are solely responsible for determining the
      appropriateness of using or redistributing the Work and assume any
      risks associated with Your exercise of permissions under this License.

   8. Limitation of Liability. In no event and under no legal theory,
      whether in tort (including negligence), contract, or otherwise,
      unless required by applicable law (such as deliberate and grossly
      negligent acts) or agreed to in writing, shall any Contributor be
      liable to You for damages, including any direct, indirect, special,
      incidental, or consequential damages of any character arising as a
      result of this License or out of the use or inability to use the
      Work (including but not limited to damages for loss of goodwill,
      work stoppage, computer failure or malfunction, or any and all
      other commercial damages or losses), even if such Contributor
      has been advised of the possibility of such damages.

   9. Accepting Warranty or Additional Liability. While redistributing
      the Work or Derivative Works thereof, You may choose to offer,
      and charge a fee for, acceptance of support, warranty, indemnity,
      or other liability obligations and/or rights consistent with this
      License. However, in accepting such obligations, You may act only
      on Your own behalf and on Your sole responsibility, not on behalf
      of any other Contributor, and only if You agree to indemnify,
      defend, and hold each Contributor harmless for any liability
      incurred by, or claims asserted against, such Contributor by reason
      of your accepting any such warranty or additional liability.

   END OF TERMS AND CONDITIONS

   APPENDIX: How to apply the Apache License to your work.

      To apply the Apache License to your work, attach the following
      boilerplate notice, with the fields enclosed by brackets "[]"
      replaced with your own identifying information. (Don't include
      the brackets!)  The text should be enclosed in the appropriate
      comment syntax for the file format. We also recommend that a
      file or class name and description of purpose be included on the
      same "printed page" as the copyright notice for easier
      identification within third-party archives.

   Copyright [yyyy] [name of copyright owner]

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License`}>Apache License 2.0</MenuItem>
                    </Select>
                    </FormControl>

                    <TextField
                    id='tests'  
                    label="Tests"
                    value={userFormData.tests}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='repoLink'  
                    label="Repository Link"
                    value={userFormData.repoLink}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />

                    <TextField
                    id='deployedLink'  
                    label="Deployed Link"
                    value={userFormData.deployedLink}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    margin="normal"
                    />
                    <Button
                    disabled={!(userFormData.title) || renderToggle === 'render'}
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
                <FormControlLabel  control={<Switch onChange={(event) => handleToggle(event)}/>} label="Render" />
                <Popper  
                id={id}
                open={open}
                anchorEl={anchorEl}    
                placement='top-start'
                >
                  Note: You can only save when rendering is off
                </Popper>
                <ToggleButtonGroup
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting">
                <ToggleButton value="bold" aria-label="bold" >
                  <strong>B</strong>
                </ToggleButton>
                <ToggleButton value="italics" aria-label="bold" >
                  <em >I</em>
                </ToggleButton>
                <ToggleButton value="underline" aria-label="bold" >
                  <u>U</u>
                </ToggleButton>
                <ToggleButton value="code" aria-label="bold" >
                  code
                </ToggleButton>
                <ToggleButton value="code block" aria-label="bold" >
                  code block
                </ToggleButton>
                <ToggleButton value="bullet" aria-label="bold" >
                  •
                </ToggleButton>
                <ToggleButton value="highlight" aria-label="bold" >
                  highlight
                </ToggleButton>
                <ToggleButton value="block quote" aria-label="bold" >
                  blockquote
                </ToggleButton>
                <ToggleButton value="strike through" aria-label="bold" >
                <p style={{ textDecoration: 'line-through' }}>Strike Through</p>
                </ToggleButton>
                <ToggleButton value="h1" aria-label="bold" >
                  H1
                </ToggleButton>
                <ToggleButton value="h2" aria-label="bold" >
                  H2
                </ToggleButton>
                <ToggleButton value="h3" aria-label="bold" >
                  H3
                </ToggleButton>
                <ToggleButton value="link" aria-label="bold" >
                  Link
                </ToggleButton>
                
                </ToggleButtonGroup>
            </FormGroup>
                {renderToggle === 'code' ?
                <pre ref={myElRef}>
                  {userFormData.title ? `# ${userFormData.title} \n\n` : ''}
                  {userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : ''}
                  {`${tableOfContents(userFormData)}\n\n`}
                  {userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : ''}
                  {userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n` : ''}
                  {userFormData.credits ? `## Credits\n\n ${userFormData.credits}\n\n` : ''}
                  {userFormData.license ? `## License\n\n ${userFormData.license}\n\n` : ''}
                  {userFormData.tests ? `## Test\n\n ${userFormData.tests}\n\n` : ''}
                </pre>
                : 
                <div >
                <div dangerouslySetInnerHTML={{__html: md.render(`${
                    (userFormData.title ? `# ${userFormData.title} \n\n` : '')}${
                    (userFormData.description ? `## Description\n\n${userFormData.deployedLink ? `[Visit the Deployed Site](${userFormData.deployedLink})\n\n` : ''}${userFormData.description}\n\n` : '')}${
                    (`${ToC}\n\n`)}${
                    (userFormData.installation ? `## Installation\n\n ${userFormData.installation}\n\n` : '')}${
                    (userFormData.usage ? `## Usage\n\n ${userFormData.usage}\n\n`:'')}${
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
