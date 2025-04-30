import React, { useState } from 'react'
import MainContainer from '../shared/layout/MainContainer/MainContainer'
import { PATH } from '../shared/routes/paths'
import { useLocation, useParams } from 'react-router-dom'
import "./_filechanges.scss"
import image from "../shared/assets/images/folder_empty.png"
import { useAppSelector } from '../shared/store'
import {fetchFileChanges} from '../repositories/api'
import { useQuery } from 'react-query'
import * as Diff2Html from 'diff2html'
import 'diff2html/bundles/css/diff2html.min.css'

const Index = () => {
  const {repoid}=useParams()
  const { user } = useAppSelector((state) => state.auth)
  const userName = user?.user_metadata?.user_name
  const location = useLocation()
  const [selectedFileIndex, setSelectedFileIndex] = React.useState<number | null>(null)
  const commitSha = location.state?.commitSha


  

  
  const { data: details} = useQuery({
    queryFn: () => fetchFileChanges(userName, repoid!, commitSha),
    queryKey: ["changes", userName, commitSha],
    enabled: !!userName && !!commitSha, 
  })

  const fileChanges = details?.files || []
  const diffString = details?.diffString || ''
  
  
  function parseDiffToArray(diffString: string): string[] {
    if (!diffString) return [];
    return diffString.split(/diff --git/).filter(Boolean).map(diff => `diff --git${diff}`);
  }
  const handleFileSelect = (index: number) => {
    setSelectedFileIndex(index)
    console.log(index)
  }
  const fileDiffs = parseDiffToArray(diffString)

  

  const getDiffHtml = (diff: string) => {
    return Diff2Html.html(diff, {
      inputFormat: 'diff',
      outputFormat: 'side-by-side',
      drawFileList: true,
      matching: 'lines',
      highlight: true,
      colorScheme: 'dark',
    });
  };



  return (
    <MainContainer  linkProps={{links:[{href:PATH.REPOSITORIES,name:"Repositories"},{href:"",name:"Pull Requests"},{href:"",name:"Commit"}],title:repoid!}}>
        <div className='one-commit-page'>
          
          <div className='one-commit-page__files'>
            <p className='one-commit-page__files__title'>Files :</p>
            {fileChanges?.map((file:any,fileIndex:number)=>{
              return(
              <div className='one-commit-page__files__one-file' key={file.filename} onClick={() => handleFileSelect(fileIndex)}>
                <p className='one-commit-page__files__one-file__name'>{file.filename}</p>
                <div className='one-commit-page__files__one-file__stats'>
                  <span className='one-commit-page__file-changes'>{file.deletions}</span>
                  <span className='one-commit-page__file-changes'>{file.additions}</span>
                </div>
              </div>
            )})}
          </div>


          <div className='one-commit-page__content'>
            <p className='one-commit-page__files__title'>File Content :</p>
            <div className='one-commit-page__content__blanc'>
              
              
              {selectedFileIndex !== null && fileDiffs[selectedFileIndex] ? (
                <div className="code-diff" dangerouslySetInnerHTML={{ __html: getDiffHtml(fileDiffs[selectedFileIndex]) }} />
            ) : (
              <div className='no-file-slected'>
                <img src={image} alt="folder empty" />
                <p>No File Selected</p> 
              </div>
            )}
            </div>
          </div>
        </div>
    </MainContainer>
  )
}

export default Index
