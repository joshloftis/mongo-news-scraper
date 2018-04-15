$(document).ready(() => {
  const populateArticle = () => {
    $('#main-div').fadeIn(100);
    $.ajax({
      url: '/api/articles/saved',
      method: 'GET',
    }).then((response) => {
      console.log(response);
      response.forEach((element) => {
        const {
          _id, title, summary, link,
        } = element;
        const article = `
          <div class="col-12 col-s-6 col-md-6 col-lg-4">
            <div class="article-div">
              <div class="site-content">
                <h2>${title}</h2>
                <p>${summary}</p>
              </div>
              <button class="btn mybtn"><a href="${link}">Read Article</a></button>
              <button class="btn mybtn remove" data-id="${_id}">Remove Article</button>
              <button class="btn mybtn comment" data-id="${_id}">Add Comment</button>
            </div>
          </div>
        `;
        $('#main-div').append(article);
      });
    });
  };

  const updatePage = function changeHowThePageLooks() {
    $('#side-comment-pane').addClass('expand-comment-pane');
    $('#body-area').toggleClass('blur-body');
    $('body').css('overflow', 'hidden');
  };

  const viewComment = function viewAComment(idFromCom) {
    $('#article-area, #comments-area, #form-area').hide();
    $('#article-area, #comments-area, #form-area').empty();
    $('#article-area, #comments-area, #form-area').fadeIn(400);
    const id = $(this).data('id') || idFromCom;
    $.ajax({
      url: `/api/articles/comment/${id}`,
      method: 'GET',
    }).then((response) => {
      response.forEach((element) => {
        const {
          _id, title, summary, link, comment,
        } = element;
        const article = `
          <div class="article-comment-div">
            <div class="site-content">
              <h2>${title}</h2>
              <p>${summary}</p>
            </div>
            <button class="btn mybtn"><a href="${link}">Read Article</a></button>
          </div>
        `;
        const form = `
          <div id="commentDiv">
            <textarea id="commentBox" placeholder="Add a comment to this article" required></textarea><br/>
            <div id="commentError"></div>
          </div>
          <button id="submitButton" type="submit" class="btn mybtn" value="Submit" data-id="${_id}">Submit</button>
        `;
        comment.forEach((result) => {
          const comments = `
            <div class="article-comment-div">
              <div class="site-content">
                <p>${result.commentBody}</p>
              </div>
              <button class="btn mybtn delete" data-id="${result._id}" data-comment="${_id}">Delete Comment</button>
            </div>
          `;
          $('#comments-area').append(comments);
        });
        $('#article-area').append(article);
        $('#form-area').append(form);
      });
    });
  };

  const closePane = () => {
    $('#article-area, #comments-area, #form-area').hide(500);
    $('#side-comment-pane').removeClass('expand-comment-pane');
    $('body').css('overflow', 'auto');
    $('#body-area').removeClass('blur-body');
  };

  const submitComment = function submitAComment(e) {
    e.preventDefault();
    const id = $(this).data('id');
    const commentBody = $('#commentBox').val();
    if (commentBody.length < 1) {
      $('#commentError').html('<p class="red">You must enter a comment</p>');
    } else {
      $.ajax({
        url: `/api/add/comment/${id}`,
        method: 'POST',
        data: {
          commentBody,
        },
      }).done(() => {
        viewComment(id);
      });
    }
  };

  const deleteComment = function deleteAComment(e) {
    e.preventDefault();
    const id = $(this).data('id');
    const comment = $(this).data('comment');

    $.ajax({
      url: `/api/delete/comment/${id}`,
      method: 'DELETE',
    }).then(() => {
      viewComment(comment);
    });
  };

  const removeArticle = function removeASavedArticle(e) {
    e.preventDefault();
    const id = $(this).data('id');

    $.ajax({
      url: `/api/unsave/${id}`,
      method: 'PUT',
    }).then(() => {
      $('#message>h2').html('Article Removed!');
      $('#message').show().delay(3000).fadeOut(500);
      setTimeout(() => {
        $('#main-div').empty();
        populateArticle();
      }, 200);
    });
  };

  $(document).on('click', '.remove', removeArticle);
  $(document).on('click', '.delete', deleteComment);
  $(document).on('click', '#submitButton', submitComment);
  $('.closebtn').on('click', () => {
    updatePage();
    closePane();
  });
  $(document).on('click', '.comment', viewComment).on('click', '.comment', updatePage);
  populateArticle();
});
