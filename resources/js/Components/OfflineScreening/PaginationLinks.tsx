interface PaginationLinksProps {
    pagination_links: string;
    isLoading: boolean;
  }

  const PaginationLinks = ({ pagination_links, isLoading }: PaginationLinksProps) => (
    <>
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="mt-4" dangerouslySetInnerHTML={{ __html: pagination_links }} />
      )}
    </>
  );

  export default PaginationLinks;
