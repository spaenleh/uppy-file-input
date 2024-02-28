import Uppy from "@uppy/core";
import { Button, Stack, ThemeProvider, createTheme } from "@mui/material";
import { StatusBar } from "@uppy/react";
import Tus from "@uppy/tus";
// import FileInput from "@uppy/file-input";
import "@uppy/core/dist/style.css";
import "@uppy/status-bar/dist/style.css";
import { useRef } from "react";
import { Folder } from "@mui/icons-material";

const theme = createTheme();

const App = () => {
  // replace this with the uppy instance from the UppyContext
  // here we just use the demo uppy endpoint to test
  const uppy = new Uppy({ id: "uppy1", autoProceed: true, debug: true }).use(
    Tus,
    { endpoint: "https://tusd.tusdemo.net/files/" }
  );

  // create a ref to act on the hidden input
  const ref = useRef<HTMLInputElement>(null);

  // function called when we click on the nice UI button
  const handleClick = () => {
    const { current } = ref;
    if (current) {
      // we simulate clicking on the hidden input button
      // to open the file selection dialog
      current.click();
    }
  };

  // this function is called when the file selection is done
  const handleFiles = () => {
    const { current } = ref;
    if (current) {
      const { files } = current;
      if (files) {
        // add files selected to uppy, this will upload them
        [...files].map((file) => {
          console.log("uplaoding", file.name);
          uppy.addFile({ data: file });
        });
      } else {
        console.error("no files found !");
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        width="100%"
        justifyItems="center"
        alignItems="center"
        flexGrow={1}
      >
        <h2>File Input</h2>
        <Stack spacing={2} direction="column">
          <Button
            variant="contained"
            onClick={handleClick}
            startIcon={<Folder />}
          >
            Browse Files
          </Button>
          {/* A hidden input that allows to open a file selection dialog */}
          <input
            style={{ display: "none" }}
            type="file"
            // allow multiple files to be uploaded
            multiple
            ref={ref}
            onChange={handleFiles}
          />
          {/* Just a simple statusbar to indicate that the upload was done */}
          <StatusBar uppy={uppy} hideAfterFinish={false} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};
export default App;
