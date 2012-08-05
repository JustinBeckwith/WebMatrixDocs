# How to manage Workspaces #

This guide will demonstrate how to use the WebMatrix SDK to manage different workspaces in WebMatrix.

	/// <summary>
    /// Called when the WebMatrixHost's WorkspaceChanged event fires.
    /// </summary>
    /// <param name="sender">Event source.</param>
    /// <param name="e">Event arguments.</param>
    private void WebMatrixHost_WorkspaceChanged(object sender, WorkspaceChangedEventArgs e)
    {
        _ribbonGroup.IsVisible = e.NewWorkspace is IEditorWorkspace && _isNodeSite;
    }


There are four workspaces in WebMatrix that identify major areas of the application:

1. Site
2. Editor
3. Database
4. Reports

