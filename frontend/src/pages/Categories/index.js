import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useRequestResource from 'src/hooks/useRequestResource';
import { Button, Box, Paper, Table, 
  TableBody, TableCell, TableContainer,
  TableHead, TableRow, IconButton, Dialog, 
  DialogTitle, DialogActions } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete" ;

import ColorBox from 'src/components/ColorBox';


export default function Categories() {
  const { getResourceList, resourceList, deleteResource } = 
    useRequestResource({ endpoint: "categories", resourceLabel: "Category" });
  const [open, setOpen] = useState(false);
  const [idDelete, setIdDelete] = useState(null);

  useEffect(() => {
    getResourceList();
  }, [getResourceList])

  const handleConfirmDelete = (id) => {
    setIdDelete(id);
    setOpen(true);
  }

  const handleDeleteClose = () => {
    setOpen(false);
  }

  const handleDelete = () => {
    setOpen(false);
    deleteResource(idDelete);
  }

  return (
    <div>
      <Dialog open={open} onClose={handleDeleteClose}>
        <DialogTitle>
           Do you wish to delete this category?
        </DialogTitle>
        <DialogActions>
          <Button variant="contained" onClick={handleDelete}>
            Delete  
          </Button>
          <Button variant="outlined" onClick={handleDeleteClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ 
        display: "flex",
        justifyContent: "flex-end",
        mb: 2
      }}>
        <Button 
          component={Link}
          variant="contained"
          color="primary"
          to="/categories/create"
        >
          Create Category
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 360 }} size="small">
          <TableHead>
              <TableRow>
                <TableCell align="left">
                  Name
                </TableCell>
                <TableCell align="left">
                  color
                </TableCell>
                <TableCell align="right">
                  Actions
                </TableCell>
              </TableRow>
          </TableHead>
          <TableBody>
            {resourceList.results.map((r) => {
                return <TableRow key={r.id}>
                  <TableCell align="left">
                    {r.name}
                  </TableCell>
                  <TableCell align="left">
                    <ColorBox color={`#${r.color}`} />
                  </TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: "flex", justifyContent: "flex-end"}}>
                      <Link to={`/categories/edit/${r.id}`} key="category-edit">
                        <IconButton size="large">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton size="large" 
                        onClick={() => {
                          handleConfirmDelete(r.id)
                      }}>
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}
