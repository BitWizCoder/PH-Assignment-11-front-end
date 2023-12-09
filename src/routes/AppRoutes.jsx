import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import NewAssignment from "../pages/NewAssignment";
import AllAssignments from "../pages/AllAssignments";
import { QueryClientProvider, QueryClient } from "react-query";
import UpdateAssignment from "../pages/UpdateAssignment";
import AssignmentDetails from "../pages/AssignmentDetails";
import SubmitedAssignments from "../pages/SubmitedAssignments";
import MyAssignments from "../pages/MyAssignments";
import PrivateRoute from "./PrivateRoute";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();

const AppRoutes = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="all-assignment" element={<AllAssignments />} />

          <Route
            path="new-assignment"
            element={
              <PrivateRoute>
                <NewAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path={`update-assignment/:id`}
            element={
              <PrivateRoute>
                <UpdateAssignment />
              </PrivateRoute>
            }
          />
          <Route
            path={`assignment-details/:id`}
            element={
              <PrivateRoute>
                <AssignmentDetails />
              </PrivateRoute>
            }
          />
          <Route />
          <Route
            path={`my-assignment/`}
            element={
              <PrivateRoute>
                <MyAssignments />
              </PrivateRoute>
            }
          />
          <Route
            path={`submited-assignment/`}
            element={
              <PrivateRoute>
                <SubmitedAssignments />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default AppRoutes;
